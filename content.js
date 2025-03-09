(function() {
    'use strict';

    const elementsConfig = {
        elementsToHide: [
            '.annotation.annotation-type-custom.iv-branding',
            '.ytp-ce-covering-overlay',
            '.ytp-ce-expanding-image',
            '.ytp-ce-element'
			'.div.ytReelMetapanelViewModelMetapanelItem:nth-of-type'
        ]
    };

    let settings = {
        isEnabled: true
    };

    function createCollapsibleUI() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: absolute;
            z-index: 9999;
            display: flex;
            align-items: center;
        `;

        const icon = document.createElement('div');
        const img = document.createElement('img');
        img.src = browser.runtime.getURL('settings-icon.png');
        img.style.cssText = `
            width: 24px;
            height: 24px;
            object-fit: contain;
        `;
        
        icon.style.cssText = `
            cursor: pointer;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 5px;
            background: black;
            border: 2px solid black;
            border-radius: 4px;
        `;
        
        icon.appendChild(img);

        const panel = document.createElement('div');
        panel.style.cssText = `
            background: #E6F7F7;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            display: none;
            position: absolute;
            left: 30px;
            top: 0;
            white-space: nowrap;
        `;

        const mainToggle = createToggle('Enable Hiding', 'isEnabled');
        panel.appendChild(mainToggle);

        const githubLink = document.createElement('a');
        githubLink.href = 'https://github.com/GartB/YTDeclutterer';
        githubLink.textContent = 'GitHub';
        githubLink.target = '_blank';
        githubLink.style.cssText = `
            display: block;
            margin-top: 5px;
            font-size: 12px;
            color: #006666;
            text-decoration: none;
        `;
        githubLink.addEventListener('mouseover', () => {
            githubLink.style.textDecoration = 'underline';
        });
        githubLink.addEventListener('mouseout', () => {
            githubLink.style.textDecoration = 'none';
        });

        panel.appendChild(githubLink);

        container.appendChild(icon);
        container.appendChild(panel);

        let isOpen = false;
        icon.addEventListener('click', () => {
            isOpen = !isOpen;
            panel.style.display = isOpen ? 'block' : 'none';
        });

        function positionContainer() {
            const logo = document.querySelector('#logo-icon');
            if (logo) {
                const logoRect = logo.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const verticalOffset = (logoRect.height - containerRect.height) / 2;
                container.style.top = `${logoRect.top + verticalOffset}px`;
                container.style.left = `${logoRect.right}px`;
            }
        }

        positionContainer();
        document.body.appendChild(container);

        window.addEventListener('resize', positionContainer);

        const observer = new MutationObserver(() => {
            if (document.querySelector('#logo-icon')) {
                positionContainer();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function createToggle(labelText, settingKey) {
        const container = document.createElement('div');
        container.style.cssText = `
            display: inline-flex;
            align-items: center;
        `;
        
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        
        checkbox.type = 'checkbox';
        checkbox.checked = settings[settingKey];
        
        checkbox.addEventListener('change', () => {
            settings[settingKey] = checkbox.checked;
            updateVisibility();
        });

        label.textContent = labelText;
        label.style.cssText = `
            margin-right: 5px;
            display: inline-flex;
            align-items: center;
        `;
        label.appendChild(checkbox);
        
        container.appendChild(label);
        return container;
    }

    function updateVisibility() {
        const displayValue = settings.isEnabled ? 'none' : '';
        
        elementsConfig.elementsToHide.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.display = displayValue;
            });
        });
    }

    updateVisibility();
    createCollapsibleUI();

    const observer = new MutationObserver(updateVisibility);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
