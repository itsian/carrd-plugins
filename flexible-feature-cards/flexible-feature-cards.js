(function() {
    const PLUGIN_ID = 'flexible-feature-cards';
    const PLUGIN_VERSION = '1.0.0';

    // Plugin configuration
    const config = {
        name: 'Flexible Feature Cards',
        version: PLUGIN_VERSION,
        author: 'Your Name',
        description: 'Customizable feature cards with flexible column options',
        fields: [
            // Global Layout Settings
            {
                name: 'columnCount',
                type: 'select',
                label: 'Number of Columns',
                options: [
                    { value: '2', label: '2 Columns' },
                    { value: '3', label: '3 Columns' },
                    { value: '4', label: '4 Columns' },
                    { value: '5', label: '5 Columns' }
                ],
                default: '3'
            },
            {
                name: 'equalHeight',
                type: 'toggle',
                label: 'Equal Height Cards',
                default: true
            },
            {
                name: 'containerPadding',
                type: 'number',
                label: 'Container Padding',
                default: 20
            },
            {
                name: 'columnGap',
                type: 'number',
                label: 'Space Between Cards',
                default: 30
            },
            {
                name: 'borderRadius',
                type: 'number',
                label: 'Card Corner Radius',
                default: 8
            },
            // Dynamic Card Settings - These will be generated based on column count
            ...generateDynamicCardFields(5) // Generate fields for maximum possible columns
        ]
    };

    // Helper function to generate card configuration fields
    function generateDynamicCardFields(maxColumns) {
        const fields = [];
        for (let i = 1; i <= maxColumns; i++) {
            fields.push(
                {
                    name: `card${i}Background`,
                    type: 'color',
                    label: `Card ${i} Background Color`,
                    default: '#4a4a4a'
                },
                {
                    name: `card${i}Icon`,
                    type: 'icon',
                    label: `Card ${i} Icon`,
                    default: getDefaultIcon(i)
                },
                {
                    name: `card${i}Title`,
                    type: 'text',
                    label: `Card ${i} Title`,
                    default: getDefaultTitle(i)
                },
                {
                    name: `card${i}Text`,
                    type: 'textarea',
                    label: `Card ${i} Text`,
                    default: getDefaultText(i)
                }
            );
        }
        return fields;
    }

    // Helper function to get default icons
    function getDefaultIcon(index) {
        const icons = ['building-columns', 'sterling-sign', 'hard-hat', 'chart-line', 'users'];
        return icons[index - 1] || 'star';
    }

    // Helper function to get default titles
    function getDefaultTitle(index) {
        const titles = ['ACCREDITED', 'COMPETITIVE PRICING', 'SAFETY', 'PERFORMANCE', 'TEAM'];
        return titles[index - 1] || `FEATURE ${index}`;
    }

    // Helper function to get default text
    function getDefaultText(index) {
        const texts = [
            'Our teams are fully trained and certified to current standards.',
            'Top-quality service at competitive prices that won\'t break the bank.',
            'Your safety comes first with rigorous testing and safety checks.',
            'Proven track record of excellent performance and reliability.',
            'Experienced team dedicated to delivering the best results.'
        ];
        return texts[index - 1] || `Description for feature ${index}`;
    }

    class FlexibleFeatureCards {
        constructor(container, options) {
            this.container = container;
            this.options = options;
            this.init();
        }

        init() {
            this.element = document.createElement('div');
            this.element.className = 'feature-cards-container';
            this.addStyles();
            this.createCards();
            this.container.appendChild(this.element);
        }

        createCards() {
            const columnCount = parseInt(this.options.columnCount);
            
            for (let i = 1; i <= columnCount; i++) {
                const card = document.createElement('div');
                card.className = 'feature-card';
                card.style.backgroundColor = this.options[`card${i}Background`];

                const icon = document.createElement('i');
                icon.className = `fas fa-${this.options[`card${i}Icon`]} card-icon`;
                
                const title = document.createElement('h3');
                title.className = 'card-title';
                title.textContent = this.options[`card${i}Title`];
                
                const text = document.createElement('p');
                text.className = 'card-text';
                text.textContent = this.options[`card${i}Text`];
                
                card.appendChild(icon);
                card.appendChild(title);
                card.appendChild(text);
                
                this.element.appendChild(card);
            }
        }

        addStyles() {
            const columnCount = parseInt(this.options.columnCount);
            const styles = `
                .feature-cards-container {
                    display: flex;
                    gap: ${this.options.columnGap}px;
                    padding: ${this.options.containerPadding}px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .feature-card {
                    flex: 1;
                    min-width: calc((100% / ${columnCount}) - ${this.options.columnGap * (columnCount - 1) / columnCount}px);
                    padding: 2rem;
                    border-radius: ${this.options.borderRadius}px;
                    text-align: center;
                    color: white;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                    ${this.options.equalHeight ? 'display: flex; flex-direction: column;' : ''}
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                }

                .card-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                    color: white;
                }

                .card-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                }

                .card-text {
                    font-size: 1rem;
                    line-height: 1.5;
                    color: rgba(255, 255, 255, 0.9);
                    ${this.options.equalHeight ? 'flex-grow: 1;' : ''}
                }

                /* Responsive Breakpoints */
                @media (max-width: 1400px) {
                    .feature-card {
                        min-width: ${columnCount > 4 ? 'calc((100% / 4) - ' + (this.options.columnGap * 3 / 4) + 'px)' : ''};
                    }
                }

                @media (max-width: 1200px) {
                    .feature-card {
                        min-width: ${columnCount > 3 ? 'calc((100% / 3) - ' + (this.options.columnGap * 2 / 3) + 'px)' : ''};
                    }
                }

                @media (max-width: 768px) {
                    .feature-card {
                        min-width: calc(50% - ${this.options.columnGap / 2}px);
                    }
                    
                    .card-icon {
                        font-size: 2rem;
                    }
                    
                    .card-title {
                        font-size: 1.1rem;
                    }
                }

                @media (max-width: 480px) {
                    .feature-card {
                        min-width: 100%;
                        margin-bottom: ${this.options.columnGap}px;
                    }
                }
            `;

            if (!document.getElementById(`${PLUGIN_ID}-styles`)) {
                const styleSheet = document.createElement('style');
                styleSheet.id = `${PLUGIN_ID}-styles`;
                styleSheet.textContent = styles;
                document.head.appendChild(styleSheet);
            } else {
                document.getElementById(`${PLUGIN_ID}-styles`).textContent = styles;
            }
        }

        update(options) {
            this.options = options;
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
            this.addStyles();
            this.createCards();
        }

        destroy() {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
            const styleSheet = document.getElementById(`${PLUGIN_ID}-styles`);
            if (styleSheet) {
                styleSheet.parentNode.removeChild(styleSheet);
            }
        }
    }

    // Register plugin with Carrd
    if (typeof Carrd !== 'undefined') {
        Carrd.plugins.register(PLUGIN_ID, {
            config: config,
            create: (container, options) => new FlexibleFeatureCards(container, options)
        });
    }
})();
