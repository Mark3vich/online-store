document.getElementById('avatarInput').addEventListener('change', function() {
    var fileName = this.files[0] ? this.files[0].name : 'No file chosen';
    document.getElementById('fileName').textContent = fileName;
});