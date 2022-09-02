const category = async ()=>{
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const categorylist = await response.json();
    // console.log(category);
    // console.log(category.data.news_category[1].category_name);
    return categorylist;
}

const display = async () => {
    const data = await category();
    // console.log(data)
    let menuid = document.getElementById('menu-list')
    let i = 0;
    for(let info in data.data.news_category){
        // console.log(data.data.news_category[info].category_name);
        // menuid.innerHTML=`<p>${data.data.news_category[info].category_name}</p>`
        const p = document.createElement("button");
        p.classList.add('btn','fw-bold')
        p.innerHTML =`${data.data.news_category[info].category_name}`
        menuid.appendChild(p)
    }
}
display()