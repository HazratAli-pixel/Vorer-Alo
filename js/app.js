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
        category_btn.classList.add('btn','fw-bold')
        category_btn.setAttribute('id',zero.concat(i));
        category_btn.setAttribute('onclick', 'category_click(event)')
        category_btn.innerHTML =`${data.data.news_category[info].category_name}`
        menuid.appendChild(category_btn)
        i++;
    }
    allNewsDisplay();
}

function category_click(event){
    alert(event.target.id)
}

const newsdisplay = async () =>{
    let url = " https://openapi.programming-hero.com/api/news/category/08"
    const response = await fetch(url)
    const data = await response.json()
    return data.data
}


const allNewsDisplay = async () =>{
    let newspart = document.getElementById('news_section')
    const data = await newsdisplay();
    // console.log(data);
    data.map(data =>{
        const card_div = document.createElement("div");
        card_div.classList.add('card','mb-3')
        // console.log(data._id);
        // console.log(data.title);
    
        card_div.innerHTML= `<div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4 p-3">
        <img src="${data.image_url}" class="img-fluid rounded" alt="">
      </div>
      <div class="col-md-8 position-relative">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.details?.slice(0,250).concat("...")}
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
                  <p class="m-0 fw-bolder">${data.author?.name}</p>
                  <p class="m-0 text-muted">${data.author?.published_date?.slice(0,10)}</p>
                </div>
              </div>
              <div>
                <h5 class="m-0 pe-4"><i class="fa-solid fa-eye"></i> ${data?.total_view}</h5>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-between">
              <div class="ps-4"><span class="fa-solid fa-star"></span> ${data?.rating?.number}
              </div>
              <div class="pe-3">
                <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" >Details</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>`

        newspart.appendChild(card_div)
    })
}
display()

async function textfun(){
    // const data = await newsdisplay();
    const maxSpeed = {
        car: 300, 
        bike: 60, 
        motorbike: 200, 
        airplane: 1000,
        helicopter: 400, 
        rocket: 8 * 60 * 60
    };
    
    const sortable = Object.entries(maxSpeed).sort(([,a],[,b]) => a-b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    
    console.log(sortable);
}
textfun();
