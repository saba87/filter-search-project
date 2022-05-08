// http://localhost:3000/items
const inputSearch=document.querySelector('#search');
const content=document.querySelector('.content');
const btns=document.querySelectorAll('.btn');
const closeImg=document.querySelector('.fa-window-close');
const backDrop=document.querySelector('.backdrop');
const  drop=document.querySelector('.drop-container');
let allProducts=[];
const filterData={
    searchItem:""
};

document.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:3000/items")
    .then((response)=>{
        allProducts=response.data;
        renderPage(response.data,filterData);

    })
    .catch((error)=>console.log(error));
})
function renderPage(_products,_filter){
    const filtered=_products.filter((p)=>{
    return p.title.toLowerCase().includes(_filter.searchItem.toLowerCase())});
    content.innerHTML="";
    //create product
   filtered.forEach((item,index) => {
    const productItem=document.createElement('div');
    productItem.classList.add('product');
    productItem.innerHTML=` <img class="image" src=${item.image} alt=index>
    <div class="description">
        <span class="product-price">${item.price}$</span>
        <span class="product-name">${item.title}</span>
    </div>`;
    //add event listener
    productItem.addEventListener('click',()=>{
        
        backDrop.style.display="block";
        drop.innerHTML= ` <i class="fa fa-window-close" aria-hidden="true"></i>
        <img src=${item.image} alt="">
        `;
        const close=drop.querySelector('.fa-window-close');
        close.addEventListener('click',()=>{
            backDrop.style.display="none";
        })
    })
    content.appendChild(productItem);
   });
   
    
}

inputSearch.addEventListener('input',(e)=>{
    filterData.searchItem =e.target.value;
    renderPage(allProducts,filterData);

});

btns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        filterData.searchItem=e.target.dataset.filter;
        renderPage(allProducts,filterData);
    })
})


// closeImg.addEventListener('click',()=>{
//   const backdrop=document.querySelector('.backdrop');
//   backdrop.style.display="none";
// })

 