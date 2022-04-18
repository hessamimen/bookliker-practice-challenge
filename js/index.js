document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = 'http://localhost:3000/'
    const ulList = document.querySelector('#list')
    const showPanel = document.querySelector('#show-panel')
//fetch books from db.json
fetchBooks()
    function fetchBooks(){
        fetch(baseUrl+'books')
        .then(res => res.json())
        .then(books => renderBooks(books))
    }
// slap books to the dom
    function renderBooks(books){
        books.forEach(book => {
            const liList = document.createElement('li');
            liList.innerHTML = book.title;
            ulList.append(liList)

            liList.addEventListener('click', () => handleClick(book))
    }
        )
    }

    function handleClick(e){
        showPanel.innerHTML = ''
        showPanel.innerHTML = `
            <img src=${e['img_url']}> 
            <h4>${e.title}</h4>               
            <h4>${e.subtitle}</h4>               
            <h4>${e.author}</h4>               
            <p>${e.description}</p> `

            createUserLike(e);

            const likeButton = document.createElement('button')
            likeButton.textContent = 'LIKE'
            showPanel.append(likeButton);

            likeButton.addEventListener('click', ()=>{
            if(likeButton.textContent === 'LIKE'){
                likeButton.textContent = 'UNLIKE'
                handleLike(e)
            } else{
                likeButton.textContent = 'LIKE';
                handleUnlike(e)

            }
        })
    }

    function createUserLike(e){
        const usersUl = document.createElement('ul')
            e.users.forEach(user =>{
                const usersLi = document.createElement('li')
                usersLi.innerHTML = user.username
                usersUl.append(usersLi)
            })
            showPanel.append(usersUl)
    }


    function handleLike(e){
            let newLikedUsers = [...e.users, {'id':1, 'username':'pouros'}]
                fetch(`http://localhost:3000/books/${e.id}`,{
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'users': newLikedUsers})
            })
            .then(res => res.json())
            .then(data => data)
        }

        function handleUnlike(e){
            let newLikedUsers = [e.users].pop();
                fetch(`http://localhost:3000/books/${e.id}`,{
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'users': newLikedUsers})
            })
            .then(res => res.json())
            .then(data => data)
        }

    
});

//-------------------basic solution-----------------
        // fetch(baseUrl+'books')
        // .then(res => res.json())
        // .then(books => {
        //     books.forEach(book => {
        //         const liList = document.createElement('li');
        //         liList.innerHTML = book.title;
        //         ulList.append(liList)

        //         liList.addEventListener('click', ()=>{
        //             showPanel.innerHTML = ''
        //             const img = document.createElement('img')
        //             img.src = book['img_url'];
        //             img.style.display= 'block'
        //             const bookTitle = document.createElement('h4')
        //             const bookSubtitle = document.createElement('h4')
        //             const bookAuthor = document.createElement('h4')
        //             const bookDescription = document.createElement('p')
        //             const usersUl = document.createElement('ul')
        //             const likeButton = document.createElement('button')
        //             likeButton.textContent = 'LIKE'
        //             bookTitle.textContent = book.title
        //             bookSubtitle.textContent = book.subtitle
        //             bookAuthor.textContent = book.author
        //             bookDescription.textContent = book.description
        //             book.users.forEach(user =>{
        //             const usersLi = document.createElement('li')
        //                 usersLi.innerHTML = user.username
        //                 usersUl.append(usersLi)
        //             })
        //             showPanel.append(img)
        //             showPanel.append(bookTitle)
        //             showPanel.append(bookSubtitle)
        //             showPanel.append(bookAuthor)
        //             showPanel.append(bookDescription)
        //             showPanel.append(usersUl)
        //             showPanel.append(likeButton)
//******* */

            //         likeButton.addEventListener('click', () => handleLike(e))
            // // <button>${e.users.length}</button>
            
            // handleLike = (e) => {
            // // console.log(‘Hi’, e)
            // let newLikedUsers = [e.users, {'id':1, 'username':'pouros'}]
            // fetch(`http://localhost:3000/books/${e.id}`,{
            // method: 'PATCH',
            // headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json'
            // },
            // body: JSON.stringify({
            // 'users': newLikedUsers})
            // })
            // .then(res => res.json())
            // .then(response => console.log(response))
            // }

            //************ */
        

                    // likeButton.addEventListener('click', ()=>{
                    //     fetch('http://localhost:3000/books/1', {
                    //         method: 'PATCH',
                    //         headers: { 
                    //             'Content-type': 'application/json'
                    //         },
                    //         body: JSON.stringify({})
                    //     })
                
                    //     console.log('liked')
                    // })

//                 })

//                 // console.log(book['img_url'])
//             })
//         })

