const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

//Отримуємо доступ до елементу за допомогою методу querySelector
const galleryListEl = document.querySelector('.gallery');

//Прослуховуємо подію 'click' на ul.gallery та викликаємо колбек функцію
galleryListEl.addEventListener('click', onImageClick);

function onImageClick(event) {
  //Забороняємо завантаження зображення на комп’ютер користувача
  event.preventDefault();

  //Перевіряємо чи відбувся клік по картинці
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  //Створюємо змінну в яку зберієм значення атрибута href великого зображення
  const href = event.target
    .closest('.gallery-item')
    .querySelector('.gallery-link').href;

  //Викликаємо бібліотеку basic lightbox
  const instance = basicLightbox.create(
    `<img src = "${href}" alt = "Big Image" width="1112" height="640" >`
  );
  instance.show();

  //Прослуховуємо подію 'keydown'
  document.addEventListener('keydown', event => closeOnEscape(event, instance));
}

//Закриває модальне вікно, перевіряєм чи instance не null/underfined
//використовуючи оператор операції зрівняння з нулем '?'
function closeOnEscape(event, instance) {
  if (event.code === 'Escape' && instance) {
    instance?.close();
    document.removeEventListener('keydown', closeOnEscape);
  }
}
//Створюємо розмітку для фото, проходимся методом map по масиву обєктів і додаємо їх
// в  ul.gallery використовуючи метод insertAdjacentHTML
const createGalleryItemEl = images
  .map(
    ({ preview, original, description }) => `<li class="gallery-item">
<a class="gallery-link" href= '${original}'>
  <img
    class="gallery-image"
    src= '${preview}'
    data-source= '${original}'
    alt= '${description}'
  />
</a>
</li>`
  )
  .join('');

galleryListEl.insertAdjacentHTML('beforeend', createGalleryItemEl);
