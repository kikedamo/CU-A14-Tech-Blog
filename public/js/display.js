const HomeLocation = "http://localhost:3000/";
let thisLocation = self.location.href.toString();
let item = [];

if (thisLocation == HomeLocation){
    DisplayPosts();
};

async function DisplayPosts(){
    console.log("Displaying Post(s)")
    const PostRes = await fetch('api/posts/', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(res => {
        return res;
    });
    for (let i = 0; i < PostRes.length; i++){
        item[i] = PostRes[i];
    };
    console.log(item);
    console.log(item[0].title);
}

const NewFormHandler = async(event) =>{
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();
    console.log(title);
    console.log(body);
    if (title&&body){
        const res = await fetch ('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, body}),
            headers: {'Content-Type': 'application/json'},
        });
        if (res.ok){
            document.location.replace('/dashboard')
        }else{
            alert ('Failed to Create Post');
        }
    }
};

const DeleteBtnHandler = async(event)=>{
    if (event.target.hasAtrribute('data_id')){
        const id = event.target.getAtrribute('data_id');
        const res = await fetch (`/api/posts/${id}`, {
            method: 'DELETE',
        })
        if (res.ok){
            document.location.replace('/dashboard')
        }else{
            alert ('Failed to Delete Post');
        }
    }
};

document
    .querySelector(".new-post-form")
    .addEventListener("submit", NewFormHandler);
// document
//     .querySelector(".Delete-Post-Form")
//     .addEventListener("click", DeleteBtnHandler);
