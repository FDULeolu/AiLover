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

        const apiUrl = "https://8.154.26.181:443/https://dashscope.aliyuncs.com/api/v1/apps/9b5b1d8a879c4f7881ac34ec38cc0071/completion";
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