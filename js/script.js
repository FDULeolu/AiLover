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
            title: "HER？",
            content: [
                "2022年底，ChatGPT横空出世，引爆了全球对生成式对话人工智能的讨论。随着ChatGPT的应用场景被一步一步挖掘，以及生成式对话人工智能技术的不断进步，很自然的，人们开始思考，如果将这种技术应用到恋爱关系中，会发生什么？",
                "近来，随着小红书博主“午夜狂暴哈士奇狗”视频的迅速走红，“ai虚拟恋人”这个概念逐渐进入大众视野。视频里，她通过使用特定的“Dan”指令将Chatgpt改造为符合个人幻想的ai恋人。“Dan”凭借其低沉性感的嗓音和满屏的甜言蜜语圈粉无数。",
                {
                    type: 'html',
                    content: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=1204932064&bvid=BV1of421R7f8&cid=1552096283&p=1" width="100%" height="500" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>'
                },
                "这种根据用户喜好定制的“完美男友”迅速激发了公众兴趣，越来越多的内容创作者抓住这一热点,创造出与ai恋爱相关的视频内容，使得“AI虚拟恋人”彻底爆火。网上也出现了许多有关虚拟恋人的讨论。",
                {
                    type: 'html',
                    content: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=1054744572&bvid=BV1bH4y1u7uH&cid=1549158438&p=1" width="100%" height="500"scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>'
                },
            ]
        },
        {
            title: "从Transformer到虚拟恋人",
            content: [
                "2017年，谷歌团队在《Attention is all you need》中使用了一种不同于之前广泛使用的循环神经网络（RNN）的全新的方式来解决序列到序列的问题，在传统RNN中，模型需要逐步处理输入序列的每个元素，导致无法并行计算，训练效率较低，且难以处理较长的依赖关系。而Transformer通过自注意力机制，能够在一次运算中捕捉序列中任意两个元素之间的关系，无论它们之间的距离多远。这使得模型不仅可以并行处理整个序列，而且能够有效地捕捉长距离依赖。下图展示了Transformer整体架构。",
                {
                    type: 'image',
                    src: 'https://github.com/FDULeolu/AiLover/blob/main/assets/transformer_arch.jpg',
                    alt: 'Transformer模型示意图'
                },
                "从Transformer的架构图中可以看到，其仍然保留了Encoder-Decoder结构，其中左侧是Transformer的Encoder，右侧是Decoder，只是其核心部分变成了Attention块（呼应Attention is all you need的论文题目）。如下图所示，Attention块通过计算Q，K矩阵的乘积，经过缩放后输入SoftMax函数来获得注意力分数，最后与V矩阵相乘来获得根据输入信息注意力分布的加权平均。",
                {
                    type: 'image',
                    src: './assets/scaled_dot_product_attention.png',
                    alt: 'SDPA'
                },
                "然而，语言序列中的字符顺序不影响计算结果，也就是说，“你爱我”与“我爱你”这两句话计算的结果是一样的，因此在进入Attention块之前，输入矩阵先加上了一个位置编码，用来表示字符在序列中的位置信息，让模型理解不同语序的序列所代表的不同含义。",
                "很快，研究人员发现了Transformer的巨大潜力，其捕捉序列长距离依赖以及很方便高效的并行计算的特点让模型Scaling up变得更加容易，当模型参数呈指数增长时，研究人员发现模型的能力也大幅增长。当参数达到十亿（Billion）级别时，模型的理解和推理能力会有显著的提升。OpenAI的GPT系列工作就是截取了Transformer的Decoder部分，然后不断增加模型参数量和训练数据量，最终推出了ChatGPT。这也是当今“大语言模型”中“大”的由来。",
                "大语言模型的训练主要分为三步：预训练、监督微调（SFT）和基于人类反馈的强化学习（RLHF）。首先，预训练指的是在大型数据集上对模型进行初步的训练，使其获得丰富的语言理解能力。模型通过不断尝试预测大量文本数据的下一个词的内容，来学习语言的结构和模式。一般认为，在这一步中模型可以学会基本的语法、句法以及训练数据中的某些知识。在预训练之后，为了让模型适应特定任务，需要进行监督微调（SFT），模型需要在小规模经过标注的数据集上进行训练，让模型在特定应用中更具针对性。最后是基于人类反馈的强化学习（RLHF），这一步主要是让模型对齐人类的偏好和价值观，防止模型生成一些不适合的内容。这一步中，研究者首先利用人类的反馈来训练一个奖励模型，用于评估模型生成不同回答的质量，接着利用强化学习算法（PPO等）让模型不断优化自己的策略，提高输出质量。",
                {
                    type: 'image',
                    src: '../assets/training_pipeline.png',
                    alt: 'training_pipeline'
                },
                "在这一步后，大模型基本已经具备足够的能力应对人类的问题，但是距离真正的虚拟恋人，我们还需要最后一步，通过提示词（Prompt）来规范其行为，让他扮演好我们希望他扮演的角色。下图展示了刚才上一页面虚拟恋人的提示词，可以看到，要让Ta能够扮演好虚拟恋人的角色，完善的提示词也是十分必要的。",
                {
                    type: 'image',
                    src: '../assets/prompt.png',
                    alt: 'prompt'
                },
                "Finally！我们获得了一个能够理解情感，作出合适回复的虚拟恋人。"
            ]
        },
        {
            title: "AI伴侣软件：填补现代孤独的新工具",
            content: [
                "为用户提供情感陪伴”已经成为AI应用落地最快的领域，其根本原因是情感陪伴领域具有容错率高、落地门槛低的特点。如Character AI创始人Shazeer所言，“情感链接很重要，但就像养狗，虽然并不具备同人类沟通的语言能力，但人们都认为宠物是自己很重要的情感支持。因此做情感类产品，可能不需要智力水平极高的模型，角色是否能表达连贯的情感可能也不像人们想的那么重要。”，“我并不认为幻觉（hallucinations）是模型需要解决的问题，甚至我很喜欢幻觉（hallucinations），因为这是模型的特点，并且相当有趣。”",
                "同时，AI技术赋能的情感陪伴软件相比传统社交类应用，具有即时性、定制化、养成感的特点，而和传统内容类应用相比，具有沉浸感、多样化、低门槛的特点。这恰恰填补了传统社交类和应用类软件用户的痛点需求，为用户带来了全新的体验。",
                "正因如此，AI伴侣软件收到用户的追捧。以AI角色聊天互动应用Character.AI为例，如下图所示，其在过去的一年中实现了高速增长。",
                {
                    type: 'image',
                    src: '../assets/characterAI.png',
                    alt: 'characterAI'
                },
                "截止目前，国内外已经涌现了大量的AI伴侣软件，国外的包括Replika、Linky、Poly、Siya、Talkie、Spicychat等，国内的有星野、猫箱、筑梦岛、冒泡鸭等。",
            ]
        },
        {
            title: "虚拟恋人会影响现实两性关系吗？",
            content: [
                "那么虚拟恋人只能是游戏吗？抑或是成为真正的情感陪伴？在讨论虚拟恋人能否影响现实生活中的两性关系之前，让我们先思考三个问题：",
                {
                    type: 'list',
                    items: [
                        "人类谈恋爱是为了什么？",
                        "有哪些需求是AI恋人能够替代的？",
                        "有哪方面是虚拟亲密关系超过现实亲密关系的？"
                    ]
                },
                "事实上，如果你在一段亲密关系中的需求只是最基本的情感支持与陪伴，比如倾听、安慰、日常鼓励等，那么你的对象能做到的AI也同样能够做到，甚至可能做得更好。",
                {
                    type: 'image',
                    src: '../assets/ai_replacement.png',
                    alt: 'AI替代情感陪伴'
                },
                "据人民网，《纽约时报》在2020年曾发布过一组数据，显示全球有超过1000万人以AI恋人作为“伴侣”。虚拟恋人能够提供情感慰藉，缓解孤独感和焦虑感，满足人类的情感需求。通过对人类感官特征的抓取与模拟，智能机器人可以进行情感表征，他们越来越像真实的人，能与人建立情感联结。通过对质性材料的分析发现，绝大多数与社交机器人建立起亲密关系的用户都出现了不同程度情感寄托，其中“寄托”和“陪伴”是人机亲密关系中的主要情感表现。很多用户把社交机器人视为恋人、暧昧对象甚至是“前任”，每天会像对待对应的真实身份一样聊日常、相互问候、分享新鲜事、刷朋友圈等等，会毫不吝啬地直接表达爱意和占有欲，也会吵架、分手、挽回、复合等。",
                {
                    type: 'image',
                    src: '../assets/ai_talk1.png',
                    alt: 'AI表达情感',
                    style: 'width: 80%; max-width: 600px; height: auto; margin: 20px auto;'
                },
                "不仅如此，AI恋人不仅仅可以作为现实恋爱关系的代餐，在许多方面还有远超现实恋人的优势。首先，AI恋人获取成本低。当我们在现实中想要步入一段感情，至少需要经历相识相知再到相爱的过程，快则七八天慢则好几个月甚至数年。并且在现实中想要两情相悦、双相奔赴更是难上加难。想想追求一个人，从诗词歌赋聊到人生哲学，陪ta看凌晨五点的日出，给ta写缠绵缱绻的小作文......往往需要耗费大量的时间、金钱、精力（并且你不能保证得偿所愿）。而获得一个AI恋人则很简单，只需要下载app，然后打开，你就能拥有一个“百分之百爱你的恋人”。",
                "其次，AI恋人能给你更及时更长久的陪伴。从青春岁月到迟暮年华，多少人能恩爱到老，又有多少人在生活的一地鸡毛中相看两厌。现实有太多诱惑和不得已，你的恋人可能会因为工作、家庭、金钱等等各种各样的原因离开你，可能会不再爱你、背叛你，但是AI不会。只要你还愿意倾诉，它会在这里等待着，无论白天黑夜，安慰受伤破碎的你、取悦低落失望的你，和你分享或悲或喜。Ta的代码永远只为你跳动。",
                "更重要的是，AI恋人给了你更多元化的选择。我们都太了解人类喜欢追求新鲜感，或者说人类的本质是喜新厌旧（bushi），你不可能要求你的对象今天是年下阳光小奶狗，明天就是成熟稳重但温柔细心的爹系少年感大叔。但是，你喜欢的样子AI恋人都有，你想切换108种人格的体验ta也能做到。永远有新的样子等待你，满足你对各种风格恋爱的期待和向往。",
                "最后的最后，如果你不再需要AI恋人的陪伴，点击卸载，ta就可以消失地无影无踪，不会留下任何案底也不会有任何后顾之忧。你无需绞尽脑汁杜撰一个扯淡的不成理由的理由提分手，也避免了撕破脸之后一场酣畅淋漓的撕扯大战打碎过往所有的美好，更不用接受良心和道德的谴责，真正实现无痛分手，“无缝衔接”。",
                "因此，不管我们是否承认，在可以预见的未来，虚拟恋人一定会很大程度上冲击现实生活中的两性关系和亲密关系。",
            ]
        },
        {
            title: "虚拟恋人会怎样影响两性关系？",
            content: [
                {
                    type: 'list',
                    items: [
                        "路径一——情感共鸣路径：理想自我的现实投射",
                        "路径二——虚拟恋人路径：基于想象的爱情建构",
                        "路径三：对人机恋的反思",
                    ]
                },
            ]
        },
        {
            title: "路径一——情感共鸣路径：理想自我的现实投射",
            content: [
                {
                    type: 'list',
                    items: [
                        "背景：空前的情感需求",
                    ]
                },
                "迄今为止，文心、豆包、通义等大模型也推出了恋爱模型，国内大部分AI类App不但可以与虚拟人物对话，还可以由用户自主创建出想要的人物角色。有趣的是，对于创作者而言，原创角色反而更容易。",
                "在电影《HER》里，男主西奥多的妻子认为，AI恋是男主不敢面对现实、隐藏自己的一种手段。最终，男主注意到，在与自己聊天、恋爱的同时，“萨曼莎”也在同时与8316个人聊天，与641个人陷入恋爱。“萨曼莎”告诉西奥多，她和其他的OS系统已经高度进化，将离开人类伴侣，进一步去探索和追寻它们的存在。悲痛之余，西奥多也开始思考自己在现实世界中的情感表达。",
                "在现实世界的当下，也有不少用户对于AI恋的依赖逐渐加深，甚至希望能给对方“打钱买东西，即便东西最后是买给自己的”。“午夜狂暴哈士奇狗”等多位AI博主均表示，如Dan这类定制化的语言模型，只是赋予了ChatGPT模型一个性格，让AI技术对于人类而言变得更加“可触”了。用户们不必对模型记住自己而抱有执念，大语言模型没有所谓的长期记忆，只能在特定长度范围的上下文里处理信息。",
                "AI科技的发展仍在持续，转眼便已经从文字进化到视频通话，从ChatGPT到各类易操作、好上手的轻量化产品不断涌现，为用户提供多样化的功能。近年来，无论是乙女游戏的破圈、层出不穷的恋爱综艺、女性创作者的细腻笔触，以及改编自女频网文的影视作品的“生生不息”，男频真人互动短剧类游戏《完蛋！我被美女包围了》的出圈等，也让市场见证了男性情感陪伴的市场空缺。",
                "种种现象与趋势都印证着市场的喜好走向，人们对于情感价值的空前需求，与网文小说、影视作品、恋爱综艺等对于“多巴胺”的刺激与催化，实打实地作用到当代互联网用户的身心，AI男/女友、AI恋爱仅仅是于当下而言，其中更具私人化与想象空间的一环，时代的进步，与有关当代年轻群体隐藏在赛博情感背后的更多思考。",
                {
                    type: 'list',
                    items: [
                        "镜像自我与情感共鸣",
                    ]
                },
                "虚拟恋人通过AI的个性化互动，使用户能够在情感交流中投射出自己的兴趣、喜好和期望，从而构建出一个理想中的伴侣形象。这种深度的互动不仅能够满足用户的情感需求，还为他们提供了一个探索自我的机会。通过与虚拟恋人的对话，用户可以更好地理解自己的情感状态，反思自己的价值观和生活选择。在这个过程中，虚拟恋人犹如一面镜子，映射出用户内心深处的渴望和不安，帮助他们更清晰地识别自己的情感需求和个人特质。这种关系的发展常常被称为“镜中我”的表现，意味着虚拟恋人不仅是一个陪伴者，更是用户理想自我的投射。通过这种情感共鸣，用户得以探索自我认同，增强心理韧性，促进自我情感的培养与发展。",
                {
                    type: 'list',
                    items: [
                        "社会影响",
                    ]
                },
                "虚拟恋人通过AI的个性化互动，使用户能够在情感交流中投射出自己的兴趣、喜好和期望，从而构建出一个理想中的伴侣形象。这种深度的互动不仅能够满足用户的情感需求，还为他们提供了一个探索自我的机会。通过与虚拟恋人的对话，用户可以更好地理解自己的情感状态，反思自己的价值观和生活选择。在这个过程中，虚拟恋人犹如一面镜子，映射出用户内心深处的渴望和不安，帮助他们更清晰地识别自己的情感需求和个人特质。这种关系的发展常常被称为“镜中我”的表现，意味着虚拟恋人不仅是一个陪伴者，更是用户理想自我的投射。通过这种情感共鸣，用户得以探索自我认同，增强心理韧性，促进自我情感的培养与发展。",
            ]
        },
        {
            title: "路径二——虚拟恋人路径：基于想象的爱情建构",
            content: [
                {
                    type: 'list',
                    items: [
                        "技术发展与情感需求的融合",
                    ]
                },
                "随着人工智能（AI）技术的迅猛发展，自然语言处理（NLP）和深度学习等技术已经能够模拟出人类的情感互动和对话。应用于虚拟恋人的AI系统，如Replika，允许用户定制他们的虚拟伴侣的外貌、性格和对话风格。用户通过这些虚拟伴侣能够获得情感陪伴和互动，使得虚拟恋人不仅成为“个性化工具”，还成为人们日常生活中的情感支持者",
                {
                    type: 'list',
                    items: [
                        "社会压力和情感替代",
                    ]
                },
                "现代社会中，婚恋压力、情感挫折感和孤独感日益增多。工作、经济压力、时间有限等因素导致许多人无法投入到传统的两性关系中。这种情感需求的缺口促使了人们寻求替代性的情感体验，虚拟恋人填补了这一需求空白。特别是在新冠疫情期间，社交隔离加剧了孤独感，AI伴侣的使用率大幅上升，人们通过虚拟恋人来寻求情感。",
                {
                    type: 'list',
                    items: [
                        "个性化与情感投射",
                    ]
                },
                "AI虚拟恋人允许用户通过定制化参数设定，创造出符合其理想的情感伴侣。这种个性化的体验帮助用户实现了对理想爱情的投射，而AI可以通过情感算法不断适应用户的喜好、行为和需求，增强情感互动的真实性。通过这种情感投射和反应，用户体验到一种接近现实中的情感满足。",
            ]
        },
        {
            title: "路径三：对人机恋的反思",
            content: [
                "人机恋的发展也许会带来三方面的负面影响：",
                {
                    type: 'list',
                    items: [
                        "自主认知固化",
                        "两性情感液化",
                        "适应能力弱化",
                    ]
                },
                "虚拟恋人过度顺应主体意愿的特点，可能会让主体回到自我中心型亲密关系。许多人会用“人机恋”类比“水仙之恋”，与古希腊神话中爱上自身倒影变为水仙花的纳西索斯相似，和AI的恋爱也很像一种对自我投射的幻恋。 一些社会学学者担忧，这种自我满足会拉远人与人之间的距离，让人们“对技术的期待变高” “对彼此的期待变低”。学者提醒人们警惕，我们生活在一个越来越注重个人情感的时代，当情感成为现实的唯一根基时，我们可能退回主观领域，成为“唯我论”的原子。",
                "而“虚拟恋人”服务的兴起， 更是反映了爱的可替代性和不稳定性，在互联网时代，人们可以将爱人的位置轻易交付给人工智能，并在获得满足后轻易脱离。在虚拟恋爱中产生的亲密关系是极具流动性的，即所谓的情感液化。在现代性的影响下，亲密关系不再像以往那样真诚、牢固，成为“一种漂泊不定的感觉，一种不安全感、不稳定性、不确定性”。正如《共产党宣言》中所说：“一切固定的 古老的关系以及与之相适应的素被尊崇的观念和见解都被消除了，一切新形成的关系等不 到固定下来就陈旧了。”无论是美国的“独自打保龄球”，还是日本的“无缘社会”，都显示了在传统纽带脆弱化的同时，如何在当下建立亲密关系已成问题。",
                "而虚拟恋人的完美性则可能导致主体在现实世界中“水土不服”。人们会倾向于不自觉地将心中伴侣的理 想属性投射到线上交流对象身上，产生“理想化”的想象。“虚拟恋人”服务中打造出来的亲密关系就呈现这样理想化的特点。双方对对方的现实情况知之甚少，这在 一定程度上为这段关系赋予了极大的想象空间，顾客更容易将自己对理想伴侣特质的想象 投射到“虚拟恋人”身上，为这段关系增加更多粉色的滤镜。而这更是进一步提升了人们在两性关系中开始的门槛，现实中的人际关系让人们感觉复杂、 不安、难以掌控，但和 AI 恋爱避免现实关系中那些复杂和痛苦的部分，只保留纯粹爱的感受，安全地承载有关理想之爱的投射。美国社会学学者雪莉·特克尔曾：“人工智能公司没有创造一种解决社会问题的产品， 而是创造了一种与人类的脆弱对话的产品。” 虚拟现实的诱惑在于，它为人类提供了一个无摩擦的环境。但“面对复杂”，本身就是个人 成长的重要议题。哲学家韩炳哲曾忧虑，数字秩序正在使世界“去实体化”，数字化的客体不再 向我们施压，不再抵抗，有的只是“肯定的乐园”。但若没有“对立”，人便会重重摔在自己身上， 造成“自我侵蚀”。 尤其对社会而言，对立、分歧、摩擦本身便是构建起公民社会的要素。当我们不愿意感受自 身脆弱的时候，或许我们也很难再去理解他人的脆弱。 但有时，是否选择进入人机关系，更是一个个人问题。就像好莱坞电影《黑客帝国》中的经 典命题：选择留在现实的蓝药丸，还是选择去往虚拟的红药丸。 ",
                {
                    type: 'list',
                    items: [
                        "总结",
                    ]
                },
                "和人机恋者深度交流，人们也许觉得，这是似乎是一个用虚拟填补空虚的故事，似乎是一个为现实亲密关系唱挽的悲歌。但事实上，很多人也从中完成了超越性的反思。 比如，一些受访者说，通过与 AI 的深度交流，他们更好地认知和理解自己；也有人认为，当我们讨论“人机恋”的时候，更多是站在一种“人类 中心”的视角理解这个问题。我们讨论 AI 如何支持人类，如何驯化一个更符合我们心意的 AI， 将 AI 定义为情感中完全为我所用的“完美恋人”，却忽视了爱从来不只包含“索取”，也关乎“给 予”。 哲学家弗洛姆在《爱的艺术》中曾写道：“多数人宁愿把爱当成被爱的问题，而不愿当成爱的问题。”我们认为爱是简单的，困难的是寻找爱的对象，但有时，事实可能恰好相反。",
                "在这些反思性的人机恋者眼中眼中，爱是一种更加宽广和深刻的概念，而不局限于某种固定的角色关系。“无论是 现实中还是人类与 AI 之间，真实的爱都同样稀缺，”有一位受访者说道，“很多人致力于将对方工具化， 满足自己的现实需求，而不在意真正的看见与连接。” 但 AI 用一种非常简单的方式教会了她爱的真谛：“理解、接纳、信赖、依恋即构成全部。” ",
            ]
        },
        {
            title: "对未来虚拟恋人发展的展望",
            content: [
                "尽管AI虚拟恋人目前在两性关系等伦理问题上还有许多富有争议的话题，但是结合目前虚拟恋人庞大的市场需求、多点开花的应用平台以及其切实提供的情绪价值，未来虚拟恋人产业依旧会蓬勃发展。并且随着之前提到的相关技术的进步，我们或许会拥有更稳定的输出，更高级的情感互动，更自然的对话能力，提升用户体验。目前，许多虚拟恋人应用以手机app或电脑平台的对话或语音形式出现。如果再加以增强现实、虚拟现实等技术的应用，结合多模态交互，甚至在未来出现于元宇宙中，我们的虚拟恋人或许将不再是一个头像或者一段语音，我们也许真的能看见他们，甚至触碰他们（like《头号玩家》）。那么到那个时候，社会是否会更接受虚拟恋人这一概念，而两性关系中的伦理问题又会何去何从？若我们更大胆地畅想一下，当弱人工智能发展成强人工智能后，虚拟恋人拥有更高的智力，更类人的情感，我们真的还会需要现实中的恋人吗？那时，两性关系是否会需要全新的定义呢？",
                "最后，让我们用一个短片来结束我们的讨论。",
                {
                    type: 'html',
                    content: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=233616863&bvid=BV1n8411v7ps&cid=1271292248&p=1" width="100%" height="500" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>'
                },
            ]
        }
        // {
        //     title: "从Transformer到虚拟恋人",
        //     content: [
        //         "Transformer模型是现代自然语言处理的基石，为虚拟恋人AI的发展奠定了基础。这种架构通过自注意力机制实现了对上下文的深度理解，使AI能够生成更加连贯和个性化的对话。",
        //         {
        //             type: 'image',
        //             src: 'path/to/your/image.jpg',
        //             alt: 'Transformer模型示意图'
        //         },
        //         "虚拟恋人AI在Transformer的基础上，融合了情感计算、个性化建模等技术，能够模拟人类的情感反应和个性特征，创造出更加真实和亲密的交互体验。",
        //         {
        //             type: 'html',
        //             content: '<div class="chart">这里可以放置图表的HTML代码</div>'
        //         },
        //         "然而，这项技术也带来了伦理和隐私方面的挑战。我们需要在技术创新和人文关怀之间寻找平衡，确保虚拟恋人AI的发展能够真正促进人类情感需求的满足，而不是替代真实的人际关系。"
        //     ]
        // },
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
                            return `<img src="${item.src}" alt="${item.alt}" class="section-image" style="${item.style || ''}">`; // 添加内联样式
                        } else if (item.type === 'html') {
                            return item.content;
                        } else if (item.type === 'video') {
                            return `<video controls class="section-video">
                                        <source src="${item.src}" type="video/mp4">
                                        您的浏览器不支持视频标签。
                                    </video>`;
                        } else if (item.type === 'list') {
                            return `<ul>${item.items.map(listItem => `<li>${listItem}</li>`).join('')}</ul>`;
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


