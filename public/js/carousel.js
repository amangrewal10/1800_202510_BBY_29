function loadWorkshopCarousel() {
  const carouselInner = document.getElementById('carouselInner');
  
  // Query Firestore for a limited number of workshops (adjust query as needed)
  db.collection("workshops")
    .orderBy("date")
    .limit(5)
    .get()
    .then(snapshot => {
      let isFirst = true;
      snapshot.forEach(doc => {
        const data = doc.data();
        const topic = data.topic || "Untitled Workshop";
        const summary = data.summary || "";
        const date = data.date ? new Date(data.date).toDateString() : "";
        // Use the image URL if provided; otherwise, use a default image
        const imageUrl = data.picture ? data.picture : "img/default_workshop.jpg";
        
        // Create a new carousel item element
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (isFirst) {
          carouselItem.classList.add('active');
          isFirst = false;
        }
        
        // Create the image element for the slide
        const img = document.createElement('img');
        img.src = imageUrl;
        img.classList.add('d-block', 'w-100');
        img.alt = topic;
        
        // Create caption container for workshop details
        const captionDiv = document.createElement('div');
        captionDiv.classList.add('carousel-caption', 'd-none', 'd-md-block');
        const captionTitle = document.createElement('h5');
        captionTitle.innerText = topic;
        const captionText = document.createElement('p');
        captionText.innerText = summary + (date ? " - " + date : "");
        
        captionDiv.appendChild(captionTitle);
        captionDiv.appendChild(captionText);
        
        // Append image and caption to the carousel item
        carouselItem.appendChild(img);
        carouselItem.appendChild(captionDiv);
        
        // Append the carousel item to the carousel inner container
        carouselInner.appendChild(carouselItem);
      });
    })
    .catch(error => {
      console.error("Error loading carousel:", error);
    });
}

loadWorkshopCarousel();
