document.addEventListener('DOMContentLoaded', function() {
    const scrollTexts = document.querySelectorAll('.scroll-text');
    const scrollButton = document.getElementById('scrollButton'); // 获取按钮元素
    const chatContainer = document.getElementById('chatContainer'); // 获取对话框元素
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const messages = document.getElementById('messages');

    // 初次加载时显示第一行字幕
    if (scrollTexts.length > 0) {
        scrollTexts[0].classList.add('active');
    }

    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        scrollTexts.forEach((text, index) => {
            let triggerStart = index * windowHeight * 0.8;
            let triggerEnd = (index + 1) * windowHeight * 0.8;

            if (scrollPosition >= triggerStart && scrollPosition < triggerEnd) {
                text.classList.add('active');
                text.classList.remove('inactive');
            } else if (scrollPosition >= triggerEnd) {
                text.classList.remove('active');
                text.classList.add('inactive');
            } else {
                text.classList.remove('active');
                text.classList.remove('inactive');
            }
        });

        const lastText = scrollTexts[scrollTexts.length - 1];
        const lastTriggerStart = (scrollTexts.length - 1) * windowHeight * 0.8;

        if (scrollPosition >= lastTriggerStart) {
            scrollButton.classList.add('active');
        } else {
            scrollButton.classList.remove('active');
        }
    });

});


document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('scrollButton');
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const messages = document.getElementById('messages');

    // 确保所有元素被正确获取
    if (!scrollButton || !chatContainer || !userInput || !sendButton || !messages) {
        console.error("页面中的部分元素未找到，请检查 HTML 结构。");
        return;
    }

    // 处理滚动按钮点击事件，显示对话框
    scrollButton.addEventListener('click', function() {
        const scrollSection = document.querySelector('.scroll-section');
        if (scrollSection) {
            scrollSection.style.display = 'none';
        }
        if (scrollButton) {
            scrollButton.style.display = 'none';
        }
        if (chatContainer) {
            chatContainer.classList.add('active'); // 显示对话框
        } else {
            console.error("chatContainer 元素未找到，无法添加 'active' 类");
        }
    });

    // 处理发送按钮点击事件
    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    userInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            sendButton.classList.add('active');
        } else {
            sendButton.classList.remove('active');
        }
    });

    // 监听输入框的回车键
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // 发送消息函数
    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            // 创建并显示用户消息
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'user');
            messageElement.textContent = userMessage;
            messages.appendChild(messageElement);
            messages.scrollTop = messages.scrollHeight; // 确保新消息可见

            // 清空输入框
            userInput.value = '';
            sendButton.classList.remove('active');

            // 调用大语言模型 API
            fetchModelResponse(userMessage);

            // 移除这个条件判断，直接调整对话框的位置
        chatContainer.classList.remove('center');
        chatContainer.classList.add('bottom');
        }
    }

    // 调用大语言模型 API
    async function fetchModelResponse(message) {

        // const apiUrl = "https://8.154.26.181:443/https://dashscope.aliyuncs.com/api/v1/apps/9b5b1d8a879c4f7881ac34ec38cc0071/completion";
        const apiUrl = "https://www.yizhou.space/https://dashscope.aliyuncs.com/api/v1/apps/9b5b1d8a879c4f7881ac34ec38cc0071/completion";
        const apiKey = "sk-92aa5db60a1f4c94a6349abe6419669f";
    
        // 构建请求数据
        const requestData = {
            "input": {
                "prompt": message
            },
            "parameters": {},
            "debug": {}
        };
    
        try {
            console.log("发送请求到大语言模型...");
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestData)
            });
    
            console.log("API 请求完成，处理响应中...");
            if (!response.ok) {
                throw new Error(`API 请求失败，状态码：${response.status}`);
            }
    
            const responseData = await response.json();
            if (responseData && responseData.output && responseData.output.text) {
                const botMessage = responseData.output.text.trim();
                displayMessage(botMessage, 'bot');
            } else {
                displayMessage("抱歉，AI未返回有效内容。", 'error');
            }
        } catch (error) {
            console.error("API 请求错误：", error);
            displayMessage("抱歉，AI暂时无法响应，请稍后再试。", 'error');
        }
    }

    // 显示消息函数
    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight; // 确保新消息可见
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.getElementById('nextButton');
    let currentSectionIndex = 0;

    // 定义所有 section 的内容
    const sections = [
        {
            title: "从Transformer到虚拟恋人：AI技术的演进",
            content: [
                "Transformer模型是现代自然语言处理的基石，为虚拟恋人AI的发展奠定了基础。这种架构通过自注意力机制实现了对上下文的深度理解，使AI能够生成更加连贯和个性化的对话。",
                {
                    type: 'image',
                    src: 'path/to/your/image.jpg',
                    alt: 'Transformer模型示意图'
                },
                "虚拟恋人AI在Transformer的基础上，融合了情感计算、个性化建模等技术，能够模拟人类的情感反应和个性特征，创造出更加真实和亲密的交互体验。",
                {
                    type: 'html',
                    content: '<div class="chart">这里可以放置图表的HTML代码</div>'
                },
                "然而，这项技术也带来了伦理和隐私方面的挑战。我们需要在技术创新和人文关怀之间寻找平衡，确保虚拟恋人AI的发展能够真正促进人类情感需求的满足，而不是替代真实的人际关系。"
            ]
        },
        {
            title: "第二个 Section 的标题",
            content: ["第二个 Section 的第一段", "第二个 Section 的第二段"]
        },
        // 可以在这里添加更多 section
        {
            title: "从Transformer到虚拟恋人：AI技术的演进",
            content: [
                "Transformer模型是现代自然语言处理的基石，为虚拟恋人AI的发展奠定了基础。这种架构通过自注意力机制实现了对上下文的深度理解，使AI能够生成更加连贯和个性化的对话。",
                {
                    type: 'image',
                    src: 'path/to/your/image.jpg',
                    alt: 'Transformer模型示意图'
                },
                "虚拟恋人AI在Transformer的基础上，融合了情感计算、个性化建模等技术，能够模拟人类的情感反应和个性特征，创造出更加真实和亲密的交互体验。",
                {
                    type: 'html',
                    content: '<div class="chart">这里可以放置图表的HTML代码</div>'
                },
                "然而，这项技术也带来了伦理和隐私方面的挑战。我们需要在技术创新和人文关怀之间寻找平衡，确保虚拟恋人AI的发展能够真正促进人类情感需求的满足，而不是替代真实的人际关系。"
            ]
        },
    ];

    function createAllSectionsHTML() {
        return sections.map((section, index) => `
            <div class="section" id="section${index}">
                <h1>${section.title}</h1>
                <div class="section-content">
                    ${section.content.map(item => {
                        if (typeof item === 'string') {
                            return `<p>${item}</p>`;
                        } else if (item.type === 'image') {
                            return `<img src="${item.src}" alt="${item.alt}" class="section-image">`;
                        } else if (item.type === 'html') {
                            return item.content;
                        }
                    }).join('')}
                </div>
            </div>
        `).join('');
    }

    function showAllSections() {
        const allSectionsHTML = createAllSectionsHTML();
        const newContent = document.createElement('div');
        newContent.classList.add('all-sections');
        newContent.innerHTML = allSectionsHTML;

        document.body.innerHTML = '';
        document.body.appendChild(newContent);

        // 设置新内容的样式
        newContent.style.opacity = '0';

        // 添加动画效果
        setTimeout(() => {
            newContent.style.transition = 'opacity 1s ease-in-out';
            newContent.style.opacity = '1';
        }, 100);

        // 添加滚动监听
        window.addEventListener('scroll', handleScroll);
    }

    function handleScroll() {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // 初始时隐藏 NEXT 按钮
    nextButton.style.display = 'none';

    // 当对话框移到底部时显示 NEXT 按钮
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
        const observer = new MutationObserver(function() {
            if (chatContainer.classList.contains('bottom')) {
                nextButton.style.display = 'block';
            }
        });

        observer.observe(chatContainer, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // 处理 NEXT 按钮点击事件
    nextButton.addEventListener('click', function() {
        showAllSections();
        nextButton.style.display = 'none'; // 隐藏 NEXT 按钮
        chatContainer.style.display = 'none'; // 隐藏聊天界面
    });
});

