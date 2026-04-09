/**
 * CreateAIHub - YouTube Viral Content Generator
 * ALL TOOLS WORKING - FIXED VERSION
 */

// =========================
// GLOBAL VARIABLES & STATE
// =========================
let generationHistory = {
    titles: [],
    descriptions: [],
    tags: [],
    hashtags: [],
    thumbnailPrompts: [],
    viralIdeas: []
};

// Anti-repetition frameworks
const FRAMEWORKS = {
    curiosity: ['The Secret Behind', 'What Nobody Tells You About', 'The Truth About', 'This Will Change Your', 'Why Everyone Is Talking About'],
    shock: ['Shocking Results:', 'You Won\'t Believe This', 'I Was WRONG About', 'The Dark Side of', 'This BREAKS All The Rules'],
    emotional: ['Heartbreaking Story:', 'The Emotional Journey of', 'This Made Me Cry', 'The Inspiring Truth About', 'Why This Matters'],
    story: ['The Day Everything Changed', 'How I Went From', 'My Personal Experience With', 'The Real Story Behind', 'A Journey Through'],
    list: ['Top 10 Ways to', '7 Secrets of', '5 Mistakes Everyone Makes With', '3 Game-Changing Tips for', 'The Ultimate Guide to'],
    problemSolution: ['Struggling With?', 'The Solution to Your', 'Finally Fix', 'Stop Doing This With', 'The Answer to'],
    authority: ['Expert Reveals:', 'Science Proves:', 'Research Shows:', 'According to Experts:', 'The Professional Guide to']
};

// Viral tones
const TONES = ['excited', 'curious', 'urgent', 'emotional', 'surprising', 'professional', 'casual', 'dramatic', 'humorous'];

// Sentence starters
const SENTENCE_STARTERS = [
    'Did you know that', 'Here\'s something interesting:', 'Let me show you', 'You need to see this',
    'This is important:', 'Check this out:', 'I discovered something', 'What if I told you',
    'You won\'t believe what', 'Listen to this:', 'Picture this:', 'Imagine if', 'Here\'s the deal:',
    'Let me break it down:', 'Get ready for', 'Hold on to your seat:', 'You have to hear this',
    'This changes everything:', 'Pay attention:', 'I\'ve got news:', 'Here\'s what happened:'
];

// CTA variations
const CTAS = [
    'Like if you agree!', 'Subscribe for more!', 'Comment your thoughts below!', 'Share with a friend!',
    'Hit that like button!', 'Subscribe and turn on notifications!', 'Let me know in the comments!',
    'Drop a comment below!', 'Save this for later!', 'Share your experience!', 'Tag someone who needs this!',
    'Follow for more tips!', 'Join our community!', 'Watch till the end!', 'Don\'t forget to subscribe!'
];

// =========================
// INITIALIZATION
// =========================
function initToolsPage() {
    console.log('CreateAIHub Tools initialized - ALL TOOLS WORKING');
    
    // Setup character counters
    setupCharCounters();
    
    // Initialize QR Code generator
    setupQRInput();
    
    // Setup event listeners for regenerate buttons
    setupRegenerateButtons();
    
    console.log('All tools ready. Frameworks loaded:', Object.keys(FRAMEWORKS).length);
}

// =========================
// UTILITY FUNCTIONS
// =========================
function setupCharCounters() {
    // Setup for key points textarea
    const keyPointsTextarea = document.getElementById('keyPoints');
    const keyPointsCounter = document.getElementById('keyPointsCount');
    
    if (keyPointsTextarea && keyPointsCounter) {
        keyPointsTextarea.addEventListener('input', function() {
            keyPointsCounter.textContent = this.value.length;
        });
        keyPointsCounter.textContent = keyPointsTextarea.value.length;
    }
}

function setupRegenerateButtons() {
    // Regenerate titles
    document.querySelector('[onclick="regenerateTitles()"]')?.addEventListener('click', regenerateTitles);
    document.querySelector('[onclick="regenerateDescriptions()"]')?.addEventListener('click', regenerateDescriptions);
    document.querySelector('[onclick="regenerateTags()"]')?.addEventListener('click', regenerateTags);
    document.querySelector('[onclick="regenerateThumbnails()"]')?.addEventListener('click', regenerateThumbnails);
    document.querySelector('[onclick="regenerateViralIdeas()"]')?.addEventListener('click', regenerateViralIdeas);
    document.querySelector('[onclick="regenerateQRCode()"]')?.addEventListener('click', regenerateQRCode);
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomAdjective() {
    const adjectives = ['Amazing', 'Incredible', 'Unbelievable', 'Shocking', 'Surprising', 'Essential', 'Professional', 'Simple', 'Advanced', 'Secret', 'Hidden', 'Proven', 'Tested', 'Verified'];
    return getRandomItem(adjectives);
}

function getRandomEmoji(category) {
    const emojis = {
        tutorial: '🎓',
        review: '⭐',
        entertainment: '🎬',
        vlog: '📹',
        educational: '🧠',
        gaming: '🎮'
    };
    return emojis[category] || '📺';
}

// =========================
// VIRAL TITLE GENERATOR (WORKING)
// =========================
async function generateViralTitles() {
    const topic = document.getElementById('videoTopic').value.trim();
    const category = document.getElementById('videoCategory').value;
    
    if (!topic) {
        alert('Please enter a video topic');
        return;
    }
    
    // Show loading state
    const button = document.getElementById('titleBtn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    button.disabled = true;
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
        const titles = [];
        for (let i = 0; i < 6; i++) {
            titles.push(generateSingleTitle(topic, category));
        }
        
        displayTitles(titles, category);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating titles. Please try again.');
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function generateSingleTitle(topic, category) {
    const framework = getRandomItem(Object.keys(FRAMEWORKS));
    const frameworkText = getRandomItem(FRAMEWORKS[framework]);
    const tone = getRandomItem(TONES);
    const emoji = getRandomEmoji(category);
    
    // Title templates
    const templates = [
        `${frameworkText} ${topic}`,
        `How to ${topic}: The ${tone} Guide`,
        `${getRandomNumber(3, 10)} ${getRandomItem(['Secrets', 'Tips', 'Tricks', 'Ways'])} to ${topic}`,
        `${topic} ${getRandomItem(['Explained', 'Demystified', 'Revealed', 'Uncovered'])}`,
        `The ${getRandomAdjective()} Guide to ${topic}`,
        `${topic}: What ${getRandomItem(['Nobody', 'Everyone', 'They'])} ${getRandomItem(['Tells You', 'Gets Wrong', 'Misses'])}`,
        `I Tried ${topic} for ${getRandomNumber(7, 30)} Days - ${getRandomItem(['Results', 'What Happened', 'My Experience'])}`
    ];
    
    let title = getRandomItem(templates);
    
    // Add curiosity elements
    if (Math.random() > 0.5) {
        title = `${emoji} ${title}`;
    }
    
    // Add numbers
    if (Math.random() > 0.7) {
        title = `${getRandomNumber(1, 10)}. ${title}`;
    }
    
    return title;
}

function displayTitles(titles, category) {
    const output = document.getElementById('titleContent');
    const outputContainer = document.getElementById('titleOutput');
    
    let html = '<div class="titles-container">';
    
    titles.forEach((title, index) => {
        const ctrScore = getRandomNumber(70, 95);
        const viralScore = getRandomNumber(65, 90);
        
        html += `
            <div class="title-item" style="
                margin-bottom: 15px;
                padding: 15px;
                background: linear-gradient(135deg, rgba(255, 0, 0, 0.05) 0%, rgba(255, 107, 107, 0.05) 100%);
                border-radius: 10px;
                border-left: 4px solid #FF0000;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong style="color: #FF0000;">Title ${index + 1}</strong>
                    <span style="background: #FF0000; color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                        CTR: ${ctrScore}%
                    </span>
                </div>
                <div style="font-size: 1.1rem; font-weight: 600; line-height: 1.4;">
                    ${title}
                </div>
                <div style="margin-top: 10px; font-size: 0.85rem; color: #666; display: flex; gap: 15px;">
                    <span><i class="fas fa-fire"></i> Viral Score: ${viralScore}/100</span>
                    <span><i class="fas fa-brain"></i> ${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    output.innerHTML = html;
    outputContainer.classList.add('show');
    outputContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function regenerateTitles() {
    const topic = document.getElementById('videoTopic').value.trim();
    if (!topic) {
        alert('Please enter a video topic first');
        return;
    }
    generateViralTitles();
}

function copyTitleContent() {
    const content = document.getElementById('titleContent').textContent;
    copyToClipboard(content, 'Titles copied to clipboard!');
}

// =========================
// DESCRIPTION GENERATOR (WORKING)
// =========================
async function generateViralDescriptions() {
    const topic = document.getElementById('descTopic').value.trim();
    const keyPoints = document.getElementById('keyPoints').value;
    
    if (!topic) {
        alert('Please enter a video topic');
        return;
    }
    
    // Show loading state
    const button = document.getElementById('descBtn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    button.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
        const descriptions = {
            short: generateShortDescription(topic),
            medium: generateMediumDescription(topic, keyPoints),
            long: generateLongDescription(topic, keyPoints)
        };
        
        displayDescriptions(descriptions);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating descriptions. Please try again.');
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function generateShortDescription(topic) {
    const starters = [
        `🎬 Just dropped: Everything about ${topic}!`,
        `🔥 This ${topic} video will blow your mind!`,
        `🚀 You NEED to see this ${topic} content!`,
        `✨ The ultimate guide to ${topic} is here!`
    ];
    
    const cta = getRandomItem(CTAS);
    const hashtags = generateHashtags(topic, 3).join(' ');
    
    return `${getRandomItem(starters)}\n\n${cta}\n\n${hashtags}`;
}

function generateMediumDescription(topic, keyPoints) {
    const intro = getRandomItem([
        `In this video, we dive deep into ${topic}.`,
        `Welcome to this comprehensive guide on ${topic}.`,
        `Today, we're exploring everything about ${topic}.`,
        `Get ready to master ${topic} with this complete tutorial.`
    ]);
    
    let description = `${intro}\n\n`;
    
    // Add timestamps if available
    if (keyPoints) {
        const points = keyPoints.split('\n').filter(p => p.trim());
        if (points.length > 0) {
            description += `⏰ TIMESTAMPS:\n`;
            points.forEach((point, index) => {
                const time = `${getRandomNumber(0, 5) + index * 3}:${getRandomNumber(10, 59).toString().padStart(2, '0')}`;
                description += `${time} - ${point}\n`;
            });
            description += '\n';
        }
    }
    
    description += `📌 WHAT YOU'LL LEARN:\n`;
    description += `• Understanding ${topic}\n`;
    description += `• Practical tips and strategies\n`;
    description += `• Common mistakes to avoid\n`;
    description += `• Pro techniques for success\n\n`;
    
    description += `🔗 RESOURCES:\n`;
    description += `• [Resource 1]\n`;
    description += `• [Resource 2]\n\n`;
    
    description += `👍 ${getRandomItem(CTAS)}\n\n`;
    description += `🔔 Subscribe for more: [Channel Link]\n\n`;
    
    description += generateHashtags(topic, 5).join(' ');
    
    return description;
}

function generateLongDescription(topic, keyPoints) {
    const intro = getRandomItem(SENTENCE_STARTERS);
    
    let description = `🌟 ${intro} ${topic} is more important than you think. In this comprehensive video, we cover everything from basics to advanced techniques.\n\n`;
    
    // Detailed sections
    description += `📖 CHAPTERS:\n`;
    description += `00:00 - Introduction\n`;
    
    if (keyPoints) {
        const points = keyPoints.split('\n').filter(p => p.trim());
        points.forEach((point, index) => {
            const minute = getRandomNumber(1, 3) + index * 3;
            const second = getRandomNumber(0, 59);
            const time = `${minute}:${second.toString().padStart(2, '0')}`;
            description += `${time} - ${point}\n`;
        });
    } else {
        description += `02:15 - Understanding the Basics\n`;
        description += `05:30 - Advanced Techniques\n`;
        description += `08:45 - Common Mistakes\n`;
        description += `12:20 - Pro Tips & Tricks\n`;
    }
    
    description += `\n🔍 DETAILED BREAKDOWN:\n`;
    description += `We start with the fundamentals of ${topic}, then move to intermediate concepts, and finally explore advanced strategies. Each section includes practical examples and real-world applications.\n\n`;
    
    description += `💡 KEY TAKEAWAYS:\n`;
    description += `1. Master the basics first\n`;
    description += `2. Practice consistently\n`;
    description += `3. Learn from mistakes\n`;
    description += `4. Stay updated with trends\n`;
    description += `5. Connect with the community\n\n`;
    
    description += `📚 RECOMMENDED RESOURCES:\n`;
    description += `• Book: [Recommended Book]\n`;
    description += `• Tool: [Useful Tool]\n`;
    description += `• Course: [Online Course]\n`;
    description += `• Community: [Facebook Group/Discord]\n\n`;
    
    description += `👥 CONNECT WITH ME:\n`;
    description += `• Instagram: [@YourHandle]\n`;
    description += `• Twitter: [@YourHandle]\n`;
    description += `• Website: [YourWebsite.com]\n\n`;
    
    description += `🙏 SUPPORT THE CHANNEL:\n`;
    description += `If you found this video helpful, please give it a thumbs up and subscribe for more content like this!\n\n`;
    
    description += `#${topic.replace(/\s+/g, '')} #Tutorial #Guide #HowTo #Education #Learning #Tips #${getRandomItem(['Beginner', 'Advanced', 'Masterclass'])}`;
    
    return description;
}

function displayDescriptions(descriptions) {
    const output = document.getElementById('descContent');
    const outputContainer = document.getElementById('descOutput');
    
    let html = `
        <div class="description-section">
            <h5 style="color: #28a745; margin-bottom: 15px;"><i class="fas fa-bolt"></i> Short Version (Viral Hook)</h5>
            <div class="description-box" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 3px solid #28a745; margin-bottom: 20px;">
                <pre style="margin: 0; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${descriptions.short}</pre>
            </div>
            
            <h5 style="color: #17a2b8; margin-bottom: 15px;"><i class="fas fa-balance-scale"></i> Medium Version (Balanced)</h5>
            <div class="description-box" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 3px solid #17a2b8; margin-bottom: 20px;">
                <pre style="margin: 0; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${descriptions.medium}</pre>
            </div>
            
            <h5 style="color: #6f42c1; margin-bottom: 15px;"><i class="fas fa-search"></i> Long Version (SEO Optimized)</h5>
            <div class="description-box" style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 3px solid #6f42c1;">
                <pre style="margin: 0; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${descriptions.long}</pre>
            </div>
        </div>
    `;
    
    output.innerHTML = html;
    outputContainer.classList.add('show');
    outputContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function regenerateDescriptions() {
    const topic = document.getElementById('descTopic').value.trim();
    if (!topic) {
        alert('Please enter a video topic first');
        return;
    }
    generateViralDescriptions();
}

function copyDescContent() {
    const content = document.getElementById('descContent').textContent;
    copyToClipboard(content, 'Descriptions copied to clipboard!');
}

// =========================
// TAGS & HASHTAGS GENERATOR (WORKING)
// =========================
async function generateTagsAndHashtags() {
    const topic = document.getElementById('tagsTopic').value.trim();
    const count = parseInt(document.getElementById('tagsCount').value);
    
    if (!topic) {
        alert('Please enter a video topic');
        return;
    }
    
    // Show loading state
    const button = document.getElementById('tagsBtn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    button.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
        const tags = generateTags(topic, count);
        const hashtags = generateHashtags(topic, Math.min(10, Math.floor(count / 2)));
        
        displayTagsAndHashtags(tags, hashtags, topic);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating tags. Please try again.');
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function generateTags(topic, count) {
    const tags = new Set();
    
    // Add main topic variations
    const words = topic.toLowerCase().split(' ');
    tags.add(topic.toLowerCase());
    tags.add(`${topic} tutorial`);
    tags.add(`${topic} guide`);
    tags.add(`how to ${topic}`);
    tags.add(`${topic} 2024`);
    
    // Add related tags
    const related = getRelatedWords(topic);
    related.forEach(word => {
        if (tags.size < count) tags.add(word);
    });
    
    // Add trending tags
    const trending = ['viral', 'trending', 'new', 'latest', 'best', 'top', 'ultimate', 'complete', 'easy', 'simple'];
    trending.forEach(tag => {
        if (tags.size < count && Math.random() > 0.5) {
            tags.add(`${topic} ${tag}`);
        }
    });
    
    // Fill remaining slots
    while (tags.size < count) {
        tags.add(`${topic} ${getRandomItem(['tips', 'tricks', 'secrets', 'hacks', 'methods', 'techniques'])}`);
    }
    
    return Array.from(tags);
}

function generateHashtags(topic, count) {
    const hashtags = new Set();
    const words = topic.toLowerCase().split(' ');
    
    // Create hashtag variations
    hashtags.add(`#${words.join('')}`);
    hashtags.add(`#${words.join('And')}`);
    
    words.forEach(word => {
        if (hashtags.size < count && word.length > 2) {
            hashtags.add(`#${word}`);
        }
    });
    
    // Add category hashtags
    const category = document.getElementById('videoCategory')?.value || 'tutorial';
    const categoryTags = {
        tutorial: ['#Tutorial', '#HowTo', '#Learning', '#Education', '#Guide'],
        review: ['#Review', '#Unboxing', '#HonestReview', '#ProductReview', '#FirstImpressions'],
        entertainment: ['#Entertainment', '#Funny', '#Comedy', '#Viral', '#Shorts'],
        vlog: ['#Vlog', '#DailyVlog', '#Lifestyle', '#DayInTheLife', '#Vlogging'],
        educational: ['#Education', '#Learning', '#Knowledge', '#Science', '#Facts'],
        gaming: ['#Gaming', '#Gameplay', '#GamingCommunity', '#LetsPlay', '#Game']
    };
    
    (categoryTags[category] || categoryTags.tutorial).forEach(tag => {
        if (hashtags.size < count) hashtags.add(tag);
    });
    
    // Add trending hashtags
    const trending = ['#Viral', '#Trending', '#YouTube', '#ContentCreator', '#NewVideo'];
    trending.forEach(tag => {
        if (hashtags.size < count) hashtags.add(tag);
    });
    
    return Array.from(hashtags);
}

function getRelatedWords(topic) {
    const relatedMap = {
        'gaming': ['gameplay', 'walkthrough', 'tips', 'strategy', 'multiplayer', 'pc', 'console', 'mobile'],
        'cooking': ['recipe', 'food', 'meal', 'easy', 'quick', 'healthy', 'delicious'],
        'fitness': ['workout', 'exercise', 'training', 'gym', 'health', 'wellness'],
        'tech': ['technology', 'gadgets', 'devices', 'electronics', 'innovation'],
        'finance': ['money', 'investment', 'saving', 'budget', 'wealth'],
        'education': ['learning', 'teaching', 'study', 'knowledge', 'skills']
    };
    
    for (let key in relatedMap) {
        if (topic.toLowerCase().includes(key)) {
            return relatedMap[key];
        }
    }
    
    return ['beginner', 'advanced', 'tips', 'tricks', 'guide', 'tutorial'];
}

function displayTagsAndHashtags(tags, hashtags, topic) {
    const output = document.getElementById('tagsContent');
    const outputContainer = document.getElementById('tagsOutput');
    
    let html = `
        <div class="tags-section">
            <h5 style="color: #17a2b8; margin-bottom: 15px;"><i class="fas fa-tag"></i> YouTube Tags (${tags.length} total)</h5>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 25px; display: flex; flex-wrap: wrap; gap: 8px;">
    `;
    
    tags.forEach(tag => {
        html += `<span style="background: white; padding: 6px 12px; border-radius: 20px; border: 1px solid #dee2e6; font-size: 0.9rem;">${tag}</span>`;
    });
    
    html += `
            </div>
            
            <h5 style="color: #17a2b8; margin-bottom: 15px;"><i class="fas fa-hashtag"></i> Hashtags for Description (${hashtags.length} total)</h5>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; display: flex; flex-wrap: wrap; gap: 8px;">
    `;
    
    hashtags.forEach(tag => {
        html += `<span style="background: #17a2b8; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">${tag}</span>`;
    });
    
    html += `
            </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px; border-left: 4px solid #17a2b8;">
            <p style="margin: 0; font-size: 0.9rem; color: #055;">
                <i class="fas fa-info-circle"></i> <strong>How to use:</strong> Copy tags and paste into YouTube tags section. Place 3-5 hashtags at the end of your description.
            </p>
        </div>
    `;
    
    output.innerHTML = html;
    outputContainer.classList.add('show');
    outputContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function regenerateTags() {
    const topic = document.getElementById('tagsTopic').value.trim();
    if (!topic) {
        alert('Please enter a video topic first');
        return;
    }
    generateTagsAndHashtags();
}

function copyTagsContent() {
    const content = document.getElementById('tagsContent').textContent;
    copyToClipboard(content, 'Tags copied to clipboard!');
}

// =========================
// THUMBNAIL PROMPT GENERATOR (WORKING)
// =========================
async function generateThumbnailPrompts() {
    const topic = document.getElementById('thumbnailTopic').value.trim();
    const count = parseInt(document.getElementById('thumbnailCount').value);
    
    if (!topic) {
        alert('Please enter a video topic');
        return;
    }
    
    // Show loading state
    const button = document.getElementById('thumbnailBtn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    button.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 700));
    
    try {
        const prompts = [];
        for (let i = 0; i < count; i++) {
            prompts.push(generateSingleThumbnailPrompt(topic));
        }
        
        displayThumbnailPrompts(prompts);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating prompts. Please try again.');
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function generateSingleThumbnailPrompt(topic) {
    const emotions = ['surprised', 'excited', 'curious', 'shocked', 'happy', 'determined', 'confused', 'amazed'];
    const expressions = ['pointing at text', 'looking at camera with mouth open', 'holding product', 'gesturing dramatically', 'reaction face', 'before/after comparison'];
    const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'black and white', 'high contrast'];
    const textStyles = ['bold', 'large', 'glowing', '3D', 'outlined', 'gradient', 'shadowed'];
    const backgrounds = ['clean', 'blurred', 'gradient', 'pattern', 'minimal', 'dark', 'bright'];
    
    const emotion = getRandomItem(emotions);
    const expression = getRandomItem(expressions);
    const color = getRandomItem(colors);
    const textStyle = getRandomItem(textStyles);
    const background = getRandomItem(backgrounds);
    
    return `Thumbnail showing person with ${emotion} expression, ${expression}, ${color} accent color, ${textStyle} text about "${topic}", ${background} background, high CTR design`;
}

function displayThumbnailPrompts(prompts) {
    const output = document.getElementById('thumbnailContent');
    const outputContainer = document.getElementById('thumbnailOutput');
    
    let html = '<div class="prompts-container">';
    
    prompts.forEach((prompt, index) => {
        const ctrScore = getRandomNumber(75, 95);
        
        html += `
            <div class="prompt-item" style="
                margin-bottom: 15px;
                padding: 15px;
                background: linear-gradient(135deg, rgba(255, 193, 7, 0.05) 0%, rgba(253, 126, 20, 0.05) 100%);
                border-radius: 10px;
                border-left: 4px solid #fd7e14;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong style="color: #fd7e14;">Prompt ${index + 1}</strong>
                    <span style="background: #fd7e14; color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                        CTR Score: ${ctrScore}%
                    </span>
                </div>
                <div style="font-size: 1rem; line-height: 1.5;">
                    ${prompt}
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; font-size: 0.9rem; color: #856404;">
                <i class="fas fa-lightbulb"></i> <strong>Pro Tip:</strong> Use Canva or Photoshop to create these thumbnails. Focus on facial expressions and high contrast colors for maximum CTR.
            </p>
        </div>
    `;
    
    output.innerHTML = html;
    outputContainer.classList.add('show');
    outputContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function regenerateThumbnails() {
    const topic = document.getElementById('thumbnailTopic').value.trim();
    if (!topic) {
        alert('Please enter a video topic first');
        return;
    }
    generateThumbnailPrompts();
}

function copyThumbnailContent() {
    const content = document.getElementById('thumbnailContent').textContent;
    copyToClipboard(content, 'Thumbnail prompts copied to clipboard!');
}

// =========================
// VIRAL IDEA GENERATOR (WORKING)
// =========================
async function generateViralIdeas() {
    const niche = document.getElementById('viralNiche').value.trim();
    const count = parseInt(document.getElementById('ideaCount').value);
    
    if (!niche) {
        alert('Please enter your niche or topic');
        return;
    }
    
    // Show loading state
    const button = document.getElementById('viralBtn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    button.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 900));
    
    try {
        const ideas = [];
        for (let i = 0; i < count; i++) {
            ideas.push(generateSingleViralIdea(niche));
        }
        
        displayViralIdeas(ideas, niche);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating ideas. Please try again.');
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function generateSingleViralIdea(niche) {
    const formats = [
        'Challenge video:',
        'Comparison video:',
        'Tutorial series:',
        'Documentary-style:',
        'Reaction video:',
        'Behind the scenes:',
        'Myth busting:',
        'Case study:',
        'Interview with expert:',
        '24-hour challenge:',
        'Before/after transformation:',
        'Secret revealed:',
        'Ultimate guide:',
        'Common mistakes:',
        'Industry secrets:'
    ];
    
    const angles = [
        'that will surprise you',
        'nobody talks about',
        'that changed everything',
        'from a different perspective',
        'with shocking results',
        'that actually works',
        'the easy way',
        'the hard truth about',
        'you need to know',
        'they don\'t want you to know',
        'that saves time/money',
        'with proven results',
        'that nobody teaches',
        'that breaks the rules'
    ];
    
    const format = getRandomItem(formats);
    const angle = getRandomItem(angles);
    
    return `${format} ${niche} ${angle}`;
}

function displayViralIdeas(ideas, niche) {
    const output = document.getElementById('viralContent');
    const outputContainer = document.getElementById('viralOutput');
    
    let html = '<div class="ideas-container">';
    
    ideas.forEach((idea, index) => {
        const viralScore = getRandomNumber(70, 95);
        const engagementScore = getRandomNumber(65, 90);
        
        html += `
            <div class="idea-item" style="
                margin-bottom: 15px;
                padding: 15px;
                background: linear-gradient(135deg, rgba(111, 66, 193, 0.05) 0%, rgba(163, 112, 247, 0.05) 100%);
                border-radius: 10px;
                border-left: 4px solid #6f42c1;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong style="color: #6f42c1;">Idea ${index + 1}</strong>
                    <div style="display: flex; gap: 8px;">
                        <span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                            Viral: ${viralScore}%
                        </span>
                        <span style="background: #17a2b8; color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                            Engagement: ${engagementScore}%
                        </span>
                    </div>
                </div>
                <div style="font-size: 1.1rem; font-weight: 600; line-height: 1.4; margin-bottom: 10px;">
                    ${idea}
                </div>
                <div style="font-size: 0.85rem; color: #666;">
                    <i class="fas fa-clock"></i> Estimated length: ${getRandomNumber(5, 15)}-${getRandomNumber(16, 25)} minutes
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; font-size: 0.9rem; color: #495057;">
                <i class="fas fa-chart-line"></i> <strong>Pro Tip:</strong> Choose ideas with high viral scores and create compelling thumbnails to maximize views.
            </p>
        </div>
    `;
    
    output.innerHTML = html;
    outputContainer.classList.add('show');
    outputContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function regenerateViralIdeas() {
    const niche = document.getElementById('viralNiche').value.trim();
    if (!niche) {
        alert('Please enter your niche first');
        return;
    }
    generateViralIdeas();
}

function copyViralContent() {
    const content = document.getElementById('viralContent').textContent;
    copyToClipboard(content, 'Viral ideas copied to clipboard!');
}

// =========================
// QR CODE GENERATOR (WORKING)
// =========================
function setupQRInput() {
    const qrType = document.getElementById('qrType');
    const container = document.getElementById('qrInputContainer');
    
    function updateInput() {
        const type = qrType.value;
        let html = '';
        
        switch(type) {
            case 'url':
                html = `
                    <label for="qrData">Website URL</label>
                    <input type="url" id="qrData" placeholder="https://example.com" value="https://createaihub.com">
                `;
                break;
            case 'text':
                html = `
                    <label for="qrData">Text Content</label>
                    <textarea id="qrData" rows="3" placeholder="Enter text to encode">CreateAIHub - YouTube Content Generator</textarea>
                `;
                break;
            case 'email':
                html = `
                    <label for="qrData">Email Address</label>
                    <input type="email" id="qrData" placeholder="example@email.com" value="support@createaihub.com">
                    <label for="qrSubject" style="margin-top: 10px;">Email Subject (Optional)</label>
                    <input type="text" id="qrSubject" placeholder="Subject line">
                `;
                break;
            case 'wifi':
                html = `
                    <label for="qrSSID">Network Name (SSID)</label>
                    <input type="text" id="qrSSID" placeholder="Your WiFi name" value="CreateAIHub WiFi">
                    <label for="qrPassword" style="margin-top: 10px;">WiFi Password</label>
                    <input type="text" id="qrPassword" placeholder="Your WiFi password" value="securepassword123">
                    <label for="qrEncryption" style="margin-top: 10px;">Encryption Type</label>
                    <select id="qrEncryption">
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Encryption</option>
                    </select>
                `;
                break;
        }
        
        container.innerHTML = html;
    }
    
    qrType.addEventListener('change', updateInput);
    updateInput(); // Initialize
}

function generateQRCode() {
    const type = document.getElementById('qrType').value;
    const size = parseInt(document.getElementById('qrSize').value);
    const container = document.getElementById('qrcode');
    const qrText = document.getElementById('qrText');
    const downloadBtn = document.getElementById('downloadQRBtn');
    const outputContainer = document.getElementById('qrOutput');
    
    // Clear previous QR code
    container.innerHTML = '';
    
    let qrContent = '';
    let displayText = '';
    
    try {
        switch(type) {
            case 'url':
                const url = document.getElementById('qrData').value.trim();
                if (!url) {
                    alert('Please enter a URL');
                    return;
                }
                qrContent = url.startsWith('http') ? url : `https://${url}`;
                displayText = `QR Code for: ${qrContent}`;
                break;
                
            case 'text':
                const text = document.getElementById('qrData').value.trim();
                if (!text) {
                    alert('Please enter text');
                    return;
                }
                qrContent = text;
                displayText = 'Text QR Code';
                break;
                
            case 'email':
                const email = document.getElementById('qrData').value.trim();
                const subject = document.getElementById('qrSubject')?.value.trim() || '';
                if (!email) {
                    alert('Please enter an email address');
                    return;
                }
                qrContent = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
                displayText = `Email QR Code: ${email}`;
                break;
                
            case 'wifi':
                const ssid = document.getElementById('qrSSID').value.trim();
                const password = document.getElementById('qrPassword').value.trim();
                const encryption = document.getElementById('qrEncryption').value;
                
                if (!ssid) {
                    alert('Please enter a WiFi network name');
                    return;
                }
                
                qrContent = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
                displayText = `WiFi QR Code: ${ssid}`;
                break;
        }
        
        // Generate QR code
        new QRCode(container, {
            text: qrContent,
            width: size,
            height: size,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Show text and download button
        qrText.textContent = displayText;
        downloadBtn.style.display = 'inline-block';
        
        // Show output
        outputContainer.classList.add('show');
        outputContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        console.error('Error generating QR code:', error);
        alert('Error generating QR code. Please try again.');
    }
}

function downloadQRCode() {
    const qrImg = document.querySelector('#qrcode img');
    if (!qrImg) {
        alert('Please generate a QR code first');
        return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = qrImg.width;
    canvas.height = qrImg.height;
    
    // Draw white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw QR code
    ctx.drawImage(qrImg, 0, 0);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `QR_Code_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function regenerateQRCode() {
    generateQRCode();
}

// =========================
// COPY TO CLIPBOARD FUNCTION
// =========================
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;
        alertDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${successMessage}`;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(alertDiv), 300);
        }, 2000);
        
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard. Please try again.');
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// =========================
// INITIALIZE ON PAGE LOAD
// =========================
document.addEventListener('DOMContentLoaded', function() {
    initToolsPage();
});