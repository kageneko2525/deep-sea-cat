function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

document.querySelectorAll('button').forEach(function(button) {
    button.addEventListener('click', function() {
        const preElement = this.closest('pre');
        if (preElement) {
            const codeElement = preElement.querySelector('code');
            if (codeElement) {
                copyToClipboard(codeElement.textContent);
                const originalText = this.textContent;
                this.textContent = 'Copied';

                // `this`を保持する
                const self = this;
                setTimeout(function() {
                    self.textContent = "Copy";
                }, 1000);
            } 
        } 
    });
});
