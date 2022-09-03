const category = async ()=>{
    try{
        const response = await fetch("https://openapi.programming-hero.com/api/news/categories");    
        const categorylist = await response.json();
        return categorylist;
    }
    catch(err){
        let alert_section = document.getElementById('alert')
        let text = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Opss! sorry</strong> ${err}.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        alert_section.innerHTML =text
    }
}

const display = async () => {
    const data = await category();
    let menuid = document.getElementById('menu-list')
    let zero = "0";
    let i = 1;
    for(let info in data.data.news_category){
        const category_btn = document.createElement("button");
        category_btn.classList.add('btn','fw-bold','category_btn')
        category_btn.setAttribute('id',zero.concat(i));
        category_btn.setAttribute('onclick', 'allNewsDisplayCategory(event)')
        category_btn.innerHTML =`${data.data.news_category[info].category_name}`
        if(data.data.news_category[info].category_name == 'All News'){
            category_btn.classList.add('btn-primary')
        }
        menuid.appendChild(category_btn)
        i++;
    }
    allNewsDisplay();
}


const newsdisplay = async (id) =>{
    try{
        let url = `https://openapi.programming-hero.com/api/news/category/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data.data
    }catch(err){
        console.log(err)
    }
}


const allNewsDisplayCategory = async (event) =>{
    const categorybtn = document.getElementsByClassName('category_btn');
    for(let btn of categorybtn){
        btn.classList.remove('btn-primary')
    }
    let newspart = document.getElementById('news_section')
    let alertPart = document.getElementById('alert')
    event.target.classList.add('btn-primary')
    newspart.innerHTML=`<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`;
    const data = await newsdisplay(event.target.id);
    if(data.length!=0){
        alertPart.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Wow... ${data.length} items found!</strong> in ${event.target.textContent}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
    }else{
        alertPart.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>No items found!</strong> in ${event.target.textContent}, refress again
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
    }
    newspart.innerHTML="";
    data.map(data =>{
        const card_div = document.createElement("div");
        card_div.classList.add('card','mb-3')    
        card_div.innerHTML=`
    <div class="row g-0 test">
      <div class="col-sm-12 col-lg-4 p-3">
        <img src="${data.image_url}" class="img-fluid h-100 rounded" alt="">
      </div>
      <div class="col-sm-12 col-lg-8 position-relative">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${ (data.details).length >=500 ? data.details.slice(0,300).concat("..."):data.details}
          </p>
        </div>
        <div class="w-100 bg-white py-2 position-absolute bottom-0 start-0 d-flex flex-wrap justify-content-between align-items-center">
          <div class="row w-100">
            <div class="col-sm-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-between">
              <div class="ps-3 d-flex align-items-center justify-content-between">
                <div class="">
                  <img style="width: 40px;" class="rounded-circle" src="${data.author?.img}" alt="">
                </div>
                <div class="ps-2">
                  <p class="m-0 fw-bolder">${data.author?.name =='' || data.author?.name == null? "Not Found":data.author?.name}</p>
                  <p class="m-0 text-muted">${data.author?.published_date?.slice(0,10)}</p>
                </div>
              </div>
              <div>
                <h5 class="m-0 pe-4"><i class="fa-solid fa-eye"></i> ${data?.total_view ==null || data?.total_view ==0? "NO View":data.total_view}</h5>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-between">
              <div class="ps-4"><span class="fa-solid fa-star"></span> ${data?.rating?.number}
              </div>
              <div class="pe-3">
                <button class="btn btn-info" id="${data?._id}" onclick="newsdetails(event)" data-bs-toggle="modal" data-bs-target="#exampleModal" >Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>` 
        newspart.appendChild(card_div)
    })
}


const allNewsDisplay = async (id = "08") =>{
    let newspart = document.getElementById('news_section')
    const data = await newsdisplay(id);
    data.sort(function(a, b){return b.total_view - a.total_view});
    data.map(data =>{
        const card_div = document.createElement("div");
        card_div.classList.add('card','mb-3')    
        card_div.innerHTML=`
    <div class="row g-0 test">
      <div class="col-sm-12 col-lg-4 p-3">
        <img src="${data.image_url}" class="img-fluid h-100 rounded" alt="">
      </div>
      <div class="col-sm-12 col-lg-8 position-relative">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${ (data.details).length >=500 ? data.details.slice(0,300).concat("..."):data.details}
          </p>
        </div>
        <div class="w-100 bg-white py-2 position-absolute bottom-0 start-0 d-flex flex-wrap justify-content-between align-items-center">
          <div class="row w-100">
            <div class="col-sm-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-between">
              <div class="ps-3 d-flex align-items-center justify-content-between">
                <div class="">
                  <img style="width: 40px;" class="rounded-circle" src="${data.author?.img}" alt="">
                </div>
                <div class="ps-2">
                  <p class="m-0 fw-bolder">${data.author?.name =='' || data.author?.name == null? "Not Found":data.author?.name}</p>
                  <p class="m-0 text-muted">${data.author?.published_date?.slice(0,10)}</p>
                </div>
              </div>
              <div>
                <h5 class="m-0 pe-4"><i class="fa-solid fa-eye"></i> ${data?.total_view ==null || data?.total_view ==0? "NO View":data.total_view}</h5>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-between">
              <div class="ps-4"><span class="fa-solid fa-star"></span> ${data?.rating?.number}
              </div>
              <div class="pe-3">
                <button class="btn btn-info" id="${data?._id}" onclick="newsdetails(event)" data-bs-toggle="modal" data-bs-target="#exampleModal" >Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>`
        newspart.appendChild(card_div)
    })
}

const sortbyview = async (event) =>{
    let newspart = document.getElementById('news_section')
    const data = await newsdisplay(id);
    data.sort(function(a, b){return b.total_view - a.total_view});
    
}


const details= async (id)=>{
    let modalBody = document.getElementById('modal_body')
    modalBody.innerHTML=`<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
    try{
        let url=`https://openapi.programming-hero.com/api/news/${id}`
        const response = await fetch(url)
        const data = await response.json();
        return data.data
    }
    catch(err){
        let alert_section = document.getElementById('alert')
        let text = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Opss! sorry</strong> ${err}.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        alert_section.innerHTML =text
    }    
}

const newsdetails = async (event)=>{
    let id = event.target.id
    let modalBody = document.getElementById('modal_body')
    const data2 = await details(id);    
 
    modalBody.innerHTML =`<div class="card mb-3">
    <img src="${data2[0].image_url}" class="card-img-top" alt="">
    <div class="card-body">

    <div class="d-flex align-items-center ">
      <div class="">
        <img style="width: 40px;" class="rounded-circle" src="${data2[0].author.img}" alt="">
      </div>
      <div class="ps-2">
        
        <p class="m-0 fw-bolder">${data2[0].author?.name =='' || data2[0].author?.name == null? "Not Found":data2[0].author?.name}</p>
        <p class="m-0 text-muted">${data2[0].author?.published_date}</p>
      </div>
    </div>

      <h5 class="card-title">${data2[0].title}</h5>
      <p class="card-text" style="text-align: justify">${data2[0].details}</p>
    </div>
   </div>`
}

display()

