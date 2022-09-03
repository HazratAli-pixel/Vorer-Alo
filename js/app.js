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
}

function category_click(event){
    alert(event.target.id)
}
display()