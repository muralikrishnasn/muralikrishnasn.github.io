document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('current'));
            tab.classList.add('current');

            const target = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('current');
                if (content.id === target) {
                    content.classList.add('current');
                }
            });
        });
    });
});
