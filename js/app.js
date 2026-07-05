/**
 * AI Prompt Book - Core Interactive Script
 */

const CMS_BASE_URL = 'https://nitinkanade.github.io/ai-prompt-book-content/';

// Fallback prompt library in case remote fetch fails
const FALLBACK_PROMPTS = {
    anime: [
        { id: 1, title: "Neon Cyberpunk Girl", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhDmOTESylZjMUxZ5JuInWYwZ9vAjFIpT1cZ9hVxGQ9VgrxuiFOpk7z_g8vF5NMIijMZzrdE_GWHWyXs1geYjdQKPg6wRFjp6v2rfO783I4EZV_7qB2d7_EyT00hv1a5SnsW8cIHDOEEI4Zq1JpbwRQ43CVEjPkrZZ89lqZm6bpRoKwWD3M-vzd_W1lUODSE-g5KmYidEmb3Zd4PbAnCWuTkKXH81204D8fhO0O_AhvPbXJ3SfpjUQFU4LJ3yBOeeIcn0", tool: "Midjourney", prompt: "A cyberpunk anime girl sitting in a rain-slicked neon street, highly detailed, gorgeous lighting, 8k --v 6.0" },
        { id: 2, title: "Fantasy Forest Spirit", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIHq3XaUVVNDeM2WGyqdylH-x_Uagg6OTH3tk7Zn7w7omSDkhAZftC21Tqw8sth7cX6dNbDRR3L0COXjl6W0T3UpJCH3aRuIWylcY8m96RETXdumXItl2qeCIQLA8E85lZtsf9eDA5OPDwtoEOE4nZ51gJCcRxNkxJ8C7u8TimNiXF3c430UHdJRRmAALOVZzNOkbWZ4zWzUhVFNvjaaLjiMo4bcGPNPuX-mqREo4nEh45KPPO9mVERw", tool: "Midjourney", prompt: "An ethereal forest spirit in a glowing, mystical woodland, soft volumetric lighting, Tyndall effect, cinematic, 8k --v 6.0" }
    ],
    wallpapers: [
        { id: 1, title: "Sci-fi Nebula Core", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsv80qxvQW98-rtdwjgPKmollt-4dpDqyMDfKSIdM2yBA27JRSijq9S11rEcKCfrAFMnJECBjpH-FtEfmhEPkBsU25a3b0MlhVmbDMxy2nBHLOFq1c0DcVkTx14uH6Af7DgV_YijjFnLB7UV4oVKZ2y1jL0Gsef6fLcfhenntmgDbFn9WNCrdIJodDzxgVMORHwJhkFE1wLJXhk9HKXSbVLhPYT6D-xAGYUjVe6FqA1zGqFq-8IWUeIg", tool: "Midjourney", prompt: "Abstract interstellar nebula with glowing core particles, deep violet and cyan gradients, mobile wallpaper ratio 9:16 --v 6.0" }
    ],
    fantasy: [
        { id: 1, title: "Dark Obsidian Dragon", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLFJxDPE3GDhJWDxSFMsH0ZoyzRFjU-Oc9OG4B-d-LGpzxLliPSurxcn3xuQgEK2WJ985P71EB9A3YKI0ui80jZwByOjZgsfpB5Z9g2RCE59pzro05Sm7I7Kr14S5is5SZGAz-DEsQ3WHHJ-4LORRLdSPXFQIGlRTNkCDinIb2790MZd_xl3QNW5VrY979WPB_iEY1F7rWYXUF_PZU1Suj34LKUMntdfmieAPyhY8RDm5wUCWCJpgWlQ", tool: "Midjourney", prompt: "A massive dragon resting on wet obsidian rock, bioluminescent scales glowing purple, sharp focus, high contrast studio lighting --v 6.0" }
    ],
    logos: [
        { id: 1, title: "Geometric Wolf Icon", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB80Rec-_jrB4YsNCwsBBrDPCbHeGfv1ODuNl7u4_WSse8dNvhlQedvyAGt9aBv5SiciX090FGVxZwqxwg3zUFYW4Hzv3O-H0VBI7CFhG0GrzedDAAgIqSyK2eA5---_j46A8Wqp1lWZ5QTlazNoPK8I_CAS0P4q_x7i88Uch1HYMaE-HuwUr8uKF9GT6gcihS4Qz2pHn3EZZkb0SUuzegFE6qcMB_-Q7D17womJV-CZohuYqHQtgDxqw", tool: "Midjourney", prompt: "A minimalist vector line art logo of a wolf head, solid background, gold accent color, modern branding design --style raw" }
    ]
};

// State cache
let categoriesCache = [];
let activeCategory = 'anime';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPromptsShowcase();
    enhanceBlogPrompts();
});

/**
 * Initialize Mobile Navigation Toggle
 */
function initNavigation() {
    const hamburger = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav-menu');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            hamburger.textContent = mobileNav.classList.contains('active') ? 'close' : 'menu';
        });
        
        // Close menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                hamburger.textContent = 'menu';
            });
        });
    }
}

/**
 * Initialize Live Prompts tabs and fetching logic
 */
function initPromptsShowcase() {
    const tabsContainer = document.getElementById('category-tabs');
    if (!tabsContainer) return;
    
    // Fetch live categories from the CMS
    fetch(`${CMS_BASE_URL}categories.json`)
        .then(res => {
            if (!res.ok) throw new Error('Failed to load categories');
            return res.json();
        })
        .then(data => {
            categoriesCache = data;
            renderTabs(data);
            // Default load the first available category tab or 'anime'
            const defaultTab = data.find(c => c.slug === 'anime') || data[0];
            if (defaultTab) {
                switchCategory(defaultTab.slug);
            }
        })
        .catch(err => {
            console.warn('Using local fallback tabs due to fetch error:', err);
            // Fallback static categories
            const fallbacks = [
                { name: 'Anime', slug: 'anime' },
                { name: 'Wallpapers', slug: 'wallpapers' },
                { name: 'Fantasy', slug: 'fantasy' },
                { name: 'Logos', slug: 'logos' }
            ];
            categoriesCache = fallbacks;
            renderTabs(fallbacks);
            switchCategory('anime');
        });
}

/**
 * Renders Category Tabs dynamically
 */
function renderTabs(categories) {
    const tabsContainer = document.getElementById('category-tabs');
    if (!tabsContainer) return;
    
    tabsContainer.innerHTML = '';
    categories.forEach(cat => {
        // Only show tabs if we have some prompts in fallback or CMS
        const btn = document.createElement('button');
        btn.className = `tab-btn ${cat.slug === activeCategory ? 'active' : ''}`;
        btn.textContent = cat.name;
        btn.setAttribute('data-slug', cat.slug);
        btn.setAttribute('id', `tab-btn-${cat.slug}`);
        
        btn.addEventListener('click', () => {
            switchCategory(cat.slug);
        });
        
        tabsContainer.appendChild(btn);
    });
}

/**
 * Switch Active Category and Fetch Prompts
 */
function switchCategory(slug) {
    activeCategory = slug;
    
    // Update active tab styles
    const tabsContainer = document.getElementById('category-tabs');
    if (tabsContainer) {
        tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.getAttribute('data-slug') === slug) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    const gridContainer = document.getElementById('prompts-grid');
    if (!gridContainer) return;
    
    // Loading state indicator
    gridContainer.innerHTML = `
        <div class="col-span-full text-center py-12" id="loading-state">
            <p class="text-muted-styled font-medium">Loading prompts...</p>
        </div>
    `;
    
    // Attempt fetching prompts for specific category from CMS
    fetch(`${CMS_BASE_URL}${slug}.json`)
        .then(res => {
            if (!res.ok) throw new Error(`Failed to load ${slug} prompts`);
            return res.json();
        })
        .then(prompts => {
            renderPrompts(prompts);
        })
        .catch(err => {
            console.warn(`Falling back to local static prompts for '${slug}':`, err);
            const fallback = FALLBACK_PROMPTS[slug] || [];
            renderPrompts(fallback);
        });
}

/**
 * Render prompt cards in the grid
 */
function renderPrompts(prompts) {
    const gridContainer = document.getElementById('prompts-grid');
    if (!gridContainer) return;
    
    if (prompts.length === 0) {
        gridContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-muted-styled">No prompts found in this category.</p>
            </div>
        `;
        return;
    }
    
    gridContainer.innerHTML = '';
    
    prompts.forEach((item, index) => {
        // Resolve absolute image URL from relative path if it points to local images directory
        let imgUrl = item.imageUrl || item.image || 'placeholder';
        if (imgUrl.startsWith('images/')) {
            imgUrl = `${CMS_BASE_URL}${imgUrl}`;
        }
        
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.setAttribute('id', `prompt-card-${item.id || index}`);
        
        card.innerHTML = `
            <div class="prompt-badge">${item.tool || 'AI'}</div>
            <img src="${imgUrl}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'">
            <div class="prompt-overlay">
                <p class="font-display font-bold text-center text-white mb-2">${item.title}</p>
                <p class="italic text-center text-white text-sm line-clamp-3">"${item.prompt.substring(0, 100)}..."</p>
                <button class="copy-card-btn" onclick="copyText('${escapeHtml(item.prompt)}', this)">
                    <span class="material-symbols-outlined text-[18px]">content_copy</span>
                    <span>Copy Prompt</span>
                </button>
            </div>
        `;
        
        gridContainer.appendChild(card);
    });
}

/**
 * Copy string to Clipboard and trigger toast notice
 */
window.copyText = function(text, buttonElement) {
    function performCopyVisuals() {
        showToast('Prompt copied to clipboard!');
        
        // Temporary feedback on the button itself
        if (buttonElement) {
            const span = buttonElement.querySelector('span:last-child');
            if (span) {
                const originalText = span.textContent;
                span.textContent = 'Copied!';
                buttonElement.style.background = '#0566d9'; // Accent secondary color
                
                setTimeout(() => {
                    span.textContent = originalText;
                    buttonElement.style.background = 'var(--primary-container)';
                }, 2000);
            } else {
                // Simple icon button (like in the blog article)
                const originalText = buttonElement.textContent;
                buttonElement.textContent = 'done';
                const originalColor = buttonElement.style.color;
                buttonElement.style.color = '#10b981'; // Success green
                
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                    buttonElement.style.color = originalColor;
                }, 2000);
            }
        }
    }

    // Try modern Async Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            performCopyVisuals();
        }).catch(err => {
            console.warn('Async Clipboard API failed, trying fallback copy:', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }

    // Fallback using text area creation (works in headless test environments)
    function fallbackCopy(textToCopy) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            // Avoid scrolling to bottom
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                performCopyVisuals();
            } else {
                throw new Error('execCommand returned false');
            }
        } catch (err) {
            console.error('Fallback copy failed: ', err);
            showToast('Failed to copy prompt.');
        }
    }
};

/**
 * Helper to display Toast Notifications
 */
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('id', 'toast-notification');
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Escapes HTML characters to prevent XSS in prompt copying attributes
 */
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

/**
 * Scans the blog post body for prompt blockquotes and enhances them into copyable boxes.
 */
function enhanceBlogPrompts() {
    const articleBody = document.querySelector('.blog-body-content');
    if (!articleBody) return;
    
    const blockquotes = articleBody.querySelectorAll('blockquote');
    blockquotes.forEach(bq => {
        const text = bq.innerText || bq.textContent;
        const hasImagine = text.includes('/imagine');
        const codeElement = bq.querySelector('code');
        
        if (hasImagine || codeElement) {
            let promptText = '';
            let label = 'Tested Prompt';
            
            if (hasImagine) {
                const imagineIndex = text.indexOf('/imagine');
                promptText = text.substring(imagineIndex).trim();
                
                const prefix = text.substring(0, imagineIndex).trim().toLowerCase();
                if (prefix.includes('try this') || prefix.includes('experiment')) {
                    label = 'Prompt Experiment';
                } else if (prefix.includes('workflow') || prefix.includes('premium')) {
                    label = 'Premium Workflow';
                }
            } else if (codeElement) {
                promptText = codeElement.innerText || codeElement.textContent;
                promptText = promptText.trim();
                
                if (promptText.length < 20) return;
                
                const textBeforeCode = bq.innerText.replace(promptText, '').trim().toLowerCase();
                if (textBeforeCode.includes('remix') || textBeforeCode.includes('idea')) {
                    label = 'Remix Prompt';
                } else if (textBeforeCode.includes('try this') || textBeforeCode.includes('experiment')) {
                    label = 'Prompt Experiment';
                }
            }
            
            if (!promptText) return;
            
            const container = document.createElement('div');
            container.className = 'blog-prompt-box';
            container.innerHTML = `
                <div class="blog-prompt-header">
                    <span>${label}</span>
                    <button class="copy-prompt-icon-btn material-symbols-outlined" title="Copy Prompt">content_copy</button>
                </div>
                <code class="blog-prompt-code">${escapeHtml(promptText)}</code>
            `;
            
            const copyBtn = container.querySelector('.copy-prompt-icon-btn');
            copyBtn.addEventListener('click', () => {
                window.copyText(promptText, copyBtn);
            });
            
            bq.parentNode.replaceChild(container, bq);
        }
    });
}
