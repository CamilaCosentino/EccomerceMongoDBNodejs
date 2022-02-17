function triggerClick(e) {
    document.querySelector('#profileImage').click();
  }
  function displayImage(e) {
    if (e.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e){
        document.querySelector('#profileDisplay').setAttribute('src', e.target.result);
      }
      reader.readAsDataURL(e.files[0]);
    }
  }
  if(document.getElementById("abremodal")){
    var modal = document.getElementById("modal1");
    var btn = document.getElementById("abremodal");
    var span = document.getElementsByClassName("btn-close")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function() {
      modal.style.display = "block";

      body.style.position = "static";
      body.style.height = "100%";
      body.style.overflow = "hidden";
    }

    span.onclick = function() {
      modal.style.display = "none";

      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
      }
    }
  }
  

  