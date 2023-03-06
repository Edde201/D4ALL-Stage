/* const filterItem = document.querySelector(".container-buttons-work")

const selectedItem = documentSelectorAll('.gallery-work.image-gallery')

window.onload =()=>{
  filterItem.onclick = (selectedItem)=>{
    if(selectedItem.target.classList.contains('button-option')){
      filterItem.querySelector('.active-button').classList.remove('active-button')

      selectedItem.target.classList.add('active-button')
      let filterName = selectedItem.target.getAttribute('data-name')


      filterImg.forEach((image)) =>{
        let filterImages = image.getAttribute('data-name')

        if ((filterImages==filterName)) || ((filterName=='all')){
          image.classList.add('show')

          image.classList.remove('hide')
        }
        else {
          image.classList.add('hide')
          image.classList.remove('show')
        }
      }
    }
  }

  for (let i = 0; i < filterImage.length; i++) {
    filterImage[i].setAttribute('onclick', 'preview(this)')
  }
}
*/
