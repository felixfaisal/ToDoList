//get elemenets

const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.querySelector(".item-list");
const clearBtn = document.getElementById("clear-list");
const feedback = document.querySelector(".feedback");

//let itemData = [];
let itemData = JSON.parse(localStorage.getItem('list')) || [];
//console.log(itemData);
if(itemData.length>0){
    itemData.forEach(function(textValue){
        itemList.insertAdjacentHTML('beforeend','<div class= "item my-3"><h5 class="item-name text-capitalize">'+textValue+'</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>');
        handleItem(textValue);
        console.log(textValue);
    })

}
else{
    showFeedback('Sorry, No previous lists','danger');
}
//form submission

itemForm.addEventListener('submit', function(event){
    event.preventDefault();
    const textValue = itemInput.value;
    if(textValue==''){
        showFeedback('Please enter valid value','danger');
    }
    else{
        addItem(textValue);
        itemInput.value='';
        itemData.push(textValue);
        localStorage.setItem('list',JSON.stringify(itemData));
        //console.log(itemData);
        // local storage
        
//add event listeners to icons
        handleItem(textValue);
    }
});

function showFeedback(text, action){
    feedback.classList.add('showItem','alert-'+action);
    feedback.innerHTML = '<p>'+text+'</p>';
    setTimeout(function(){
        feedback.classList.remove('showItem','alert-'+action);
    },3000);
}

function addItem(value){
    const div = document.createElement('div')
    div.classList.add('item','my-3');
    div.innerHTML = '<h5 class="item-name text-capitalize">'+value+'</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div>';
    itemList.appendChild(div);
}

function handleItem(textValue){
    const items = itemList.querySelectorAll('.item');
    //console.log(items);
    items.forEach(function(item){
        //if(item.querySelector('.item-name').textContent==textValue){
            //console.log("hello");
            item.querySelector('.complete-item').addEventListener('click',function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });
            item.querySelector('.edit-item').addEventListener('click',function(){
                itemInput.value = textValue;
                //itemList.removeChild(item);
                //console.log(itemData);
                itemData = itemData.filter(function(item){
                    return item !== textValue;
                });
                itemList.removeChild(item);
            localStorage.setItem('list',JSON.stringify(itemData));
            });
            item.querySelector('.delete-item').addEventListener('click',function(){
                //itemInput.value = textValue;
                //itemList.removeChild(item);
                console.log(itemData);
                itemData = itemData.filter(function(item){
                    return item !== textValue;
                });
                itemList.removeChild(item);
                
            localStorage.setItem('list',JSON.stringify(itemData));
                showFeedback('Item Deleted','success');
                
                //console.log(itemData);
            })
        //}
    });
}

clearBtn.addEventListener('click',function(){
    itemData = [];
   
    const items = itemList.querySelectorAll('.item');
    //itemList.removeChild(items);
    if (items/*.lenght > 0*/){
        items.forEach(function(item){
            itemList.removeChild(item);
        });
        
    }
     localStorage.removeItem('list');
    
})