const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
      const id = entry.target.getAttribute('id')
      if (entry.intersectionRatio > 0) {
         document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active')
      } else {
         document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active')
      }
   })
})

document.querySelectorAll('h1[id], h2[id], h3[id]').forEach((section) => {
   observer.observe(section)
})
