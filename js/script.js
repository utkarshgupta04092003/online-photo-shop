var currPage = 1;

function landingPageData(){

    console.log('Landing page DAta function called');
    const url = `https://picsum.photos/v2/list?page=${currPage}&limit=24`
    let dom = "";
    $.ajax({
        type: 'GET',
        url: url,
        success: function(res){
            console.log(res);

            res.forEach(function(doc){

                dom = dom+ `   <div class="lg:w-1/3 sm:w-1/2 p-4">
                <div class="flex relative  cursor-pointer" onclick="details(this);" id="${doc.id}">
                    <img alt="gallery" class=" absolute inset-0 w-full h-full object-cover object-center"
                        src="${doc.download_url}">
                    <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 ">
                        <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE
                        </h2>
                        <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Shooting Stars</h1>
                        <p class="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                            microdosing tousled waistcoat.</p>
                    </div>
                </div>
            </div>
            `


            })


            
        },
        error: (err)=>{
            console.log('Some error occurs');
        }
    }).done(()=>{
        document.getElementById('photoGallary').innerHTML = dom;

    })
}

function details(e){

    console.log('Detials function called\n',e.id);
    
    localStorage.setItem('currImgId',e.id);

    window.location.href = window.location.origin+"/details.html";
}

function changePage(e){
    console.log('Pagination : ',e.id);
    let page = e.id;
    console.log('type of id: ',typeof(e.id))
    switch(page){
        case 'prev':
            if(currPage == 1)
                break;
            currPage = parseInt(currPage)-1;
            break;

        case 'next':
            currPage = parseInt(currPage)+1;
            break;
        default:
            currPage = e.id;
    }

    if(currPage == 1){

        document.getElementById('pagination-1').innerHTML = 
        `
        <p class="link px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" id="${currPage}" onclick="changePage(this);">${currPage}</p>
        `;

        document.getElementById('pagination-2').innerHTML = 
        `
        <p class="link px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" id="${parseInt(currPage)+1}" onclick="changePage(this);">${parseInt(currPage)+1}</p>
        `;


        document.getElementById('pagination-3').innerHTML = 
        `
        <p class="link px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" id="${parseInt(currPage)+22}" onclick="changePage(this);">${parseInt(currPage)+2}</p>
        `;

    }
    else if(currPage > 1){
        document.getElementById('pagination-1').innerHTML = 
        `
        <p class="link px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" id="${parseInt(currPage)-1}" onclick="changePage(this);">${parseInt(currPage)-1}</p>
        `;

        document.getElementById('pagination-2').innerHTML = 
        `
        <p class="link px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" id="${currPage}" onclick="changePage(this);">${currPage}</p>
        `;
        document.getElementById('pagination-3').innerHTML = 
        `
        <p class="link px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" id="${parseInt(currPage)+1}" onclick="changePage(this);">${parseInt(currPage)+1}</p>
        `


    }


    scrollTo(0,0);
    landingPageData();
}

function detailsPage(){
    let id = localStorage.getItem('currImgId');

    let photoDetail = "";
    let currProductName="";
    let currProductSize="";
    
    $.ajax({
        url: `https://picsum.photos/id/${id}/info`,
        type: "GET",
        success: function(res){
            
            // console.log(res);
            // console.log(document.getElementById('image'));
            document.getElementById('image').src = res.download_url;            
            document.getElementById('downloadImage').href = res.download_url;
            document.getElementById('imageId').innerHTML = id;
            document.getElementById('imageAuthor').innerHTML = res.author;

            document.getElementById('s').style.color = 'blue';
            document.getElementById('s').style.fontWeight = 'bold';

            document.getElementById('imagePrice').innerHTML = parseInt((id*99)%100)+'.00';
            document.getElementById('imageTotalPrice').innerHTML = parseFloat(parseInt((id*99)%100)*1.01).toFixed(2);


            // console.log('curr size',currProductSize );
        }
    })
    
    
    currProductName = 'Image - '+id;
    currProductSize = document.getElementById('imageSize').innerHTML;
    let storedProduct = JSON.parse(localStorage.getItem('cart-items'));
    // console.log('type of stored product',typeof storedProduct)

    let index = -1;
    console.log('storeed product : ' );
    for(let i=0;i<storedProduct.length;i++){
        if(currProductName == storedProduct[i].name && currProductSize == storedProduct[i].size){
            index = i;
            break;
        }
        // console.log(storedProduct[i]);
        
    }
    console.log('curr: ',currProductName,currProductSize);

    if(index != -1){
        document.getElementById('addToCartButton').innerHTML = "View Cart";
    }
}

function changeSize(e){

    document.getElementById('s').style.color = 'gray';
    document.getElementById('s').style.fontWeight = 'normal';
    document.getElementById('m').style.color = 'gray';
    document.getElementById('m').style.fontWeight = 'normal';
    document.getElementById('l').style.color = 'gray';
    document.getElementById('l').style.fontWeight = 'normal';
    document.getElementById('xl').style.color = 'gray';
    document.getElementById('xl').style.fontWeight = 'normal';

    e.style.color = 'blue';
    e.style.fontWeight = "bold";

    
    let price = 0;
    let totalPrice = 0;
    let imageSize = "";
    let id = document.getElementById('imageId').innerText;
    switch(e.id){
        case 's':
            price = parseInt((id*99)%100)+'.00';
            totalPrice = parseInt((id*99)%100)*1.01;
            imageSize = "Small(640 x 426)";
            break;

        case 'm':
            price = parseInt((id*99)%100)+20+'.00';
            totalPrice = parseInt((id*99)%100+20)*1.01;
            imageSize = "Medium(1920 x 1280)";
            break;

        case 'l':
            price = parseInt((id*99)%100)+40+'.00';
            totalPrice = parseInt((id*99)%100+40)*1.01;  
            imageSize = "Large(2440 x 1600)";
            break;

        case 'xl':
            price = parseInt((id*99)%100)+60+'.00';
            totalPrice = parseInt((id*99)%100+60)*1.01;
            imageSize = "Extra Large(6720 x 4480)";
            break;
        
                                    
    }

    document.getElementById('imagePrice').innerHTML = price;
    document.getElementById('imageTotalPrice').innerHTML = parseFloat(totalPrice).toFixed(2);
    document.getElementById('imageSize').innerHTML = imageSize;



    let storedProduct = JSON.parse(localStorage.getItem('cart-items'));

    let currProductName = 'Image - '+id;
    console.log('imag id:',currProductName,imageSize);
    let index = -1;
    for(let i=0;i<storedProduct.length;i++){
        if(currProductName == storedProduct[i].name && imageSize == storedProduct[i].size){
            index = i;
            break;
        }
        
    }

    if(index != -1){
        document.getElementById('addToCartButton').innerHTML = "View Cart";
    }
    else{
        document.getElementById('addToCartButton').innerHTML = "Add to Cart";

    }

}

function addToCartOrViewCart(){
    if(document.getElementById('addToCartButton').innerHTML == 'Add to Cart'){
        addToCart();
    }
    else{

        location.href = location.origin+'/cart.html';
        // viewCart();
    }
}

function addToCart(){

    let product = {
        id: document.getElementById('imageId').innerText,
        name: 'Image - '+ document.getElementById('imageId').innerText,
        author: document.getElementById('imageAuthor').innerText,
        size: document.getElementById('imageSize').innerText,
        price: document.getElementById('imagePrice').innerText,
        totalPrice: document.getElementById('imageTotalPrice').innerText,
        imageUrl: document.getElementById('image').src

    }

    // console.log(product);

    let storedProduct = JSON.parse(localStorage.getItem('cart-items'));
    // console.log('type of stored product',typeof storedProduct)

    let index = -1;
    for(let i=0;i<storedProduct.length;i++){
        if(product.name == storedProduct[i].name && product.size == storedProduct[i].size){
            index = i;
            break;
        }
    }



    // let index = storedProduct.indexOf(product);
    console.log('index', index);
    if(parseInt(index) === -1){
        storedProduct.push(product);
        localStorage.setItem('cart-items',JSON.stringify(storedProduct));
    }
    console.log('stored',storedProduct);
    swal("Congratulation !", "Product Added to Cart!", "success");
    document.getElementById('addToCartButton').innerHTML = "View Cart";


}

function viewCart(){
    // alert('view cart');
    // location.href = location.origin+'/cart.html';

    let products = JSON.parse(localStorage.getItem('cart-items'));
    let dom = "";
    let price = 0;

    products.forEach((item)=>{
        dom += 
            `
            <div class="flex items-center lg:w-3/5 mx-auto border-b pb-0 mb-10 border-gray-200 sm:flex-row flex-col bg-white border-4 relative">
            <div
                class="sm:w-32 sm:h-32 h-1/2 w-1/2 sm:mr-10 inline-flex items-center justify-center bg-indigo-100 text-indigo-500 ">

                <img id="image" class="object-cover object-center h-full w-full" alt="loading..."
                    src="${item.imageUrl}">

            </div>
            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-2"> ${item.name}</h2>
                <p class="leading-relaxed text-base">Price: <span>${item.totalPrice}</span> INR</p>
                <P class="leading-relaxed text-base">Size: <span>${item.size}</span> </P>
                <P class="leading-relaxed text-base">Quantity: <span>1</span> </P>

            </div>

            <div class="absolute top-3 right-3" id="${item.id}">
            <i class="fas fa-minus-circle"></i>
        </div>
           
        </div>
            
            `;

        price += parseFloat(item.totalPrice);



        
    })
    console.log('total cart price',price);
    document.getElementById('cart-price').innerText = '₹ '+price.toFixed(2);
    document.getElementById('total-cart-price').innerText = '₹ '+price.toFixed(2);
    document.getElementById('total-cart-amount').innerText = '₹ '+price.toFixed(2);
    $('#cart-quantity').html(products.length);
    document.getElementById('cart-items').innerHTML += dom;
}



if(localStorage.getItem('currImgId') == null){

    localStorage.setItem('currImgId',0);
}
if(localStorage.getItem('cart-items') == null){
    
    localStorage.setItem('cart-items','[]');
}
console.log('curr',localStorage.getItem('currImgId'));
console.log('curr',localStorage.getItem('cart-items'));
// landingPageData();
// detailsPage();