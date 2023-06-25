document.querySelectorAll('.animal-button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

