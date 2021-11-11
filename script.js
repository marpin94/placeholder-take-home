
//Function to fetch and display users from API - each user name will have a click event to display posts 

function getUsers(){

    //Setting up page for display, remove any content if returning from posts

    const content = document.getElementById('content')
    content.textContent=''

    const header = document.createElement('h1')
    header.textContent = 'Users'

    const h3 = document.createElement('h3')
    h3.textContent = 'Select a user to view all of their Posts'

    let table = document.createElement('table')

    const trHead = document.createElement('tr')

    let thUser = document.createElement('th')
        thUser.textContent='User'
    let thUserName = document.createElement('th')
        thUserName.textContent='UserName'
    let thEmail = document.createElement('th')
        thEmail.textContent='Email'

    trHead.appendChild(thUser)
    trHead.appendChild(thUserName)
    trHead.appendChild(thEmail)


    content.appendChild(header)
    content.appendChild(h3)
    content.appendChild(table)
    table.appendChild(trHead)

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => 
        //Loop through each user to display information 
    
        data.forEach(user => {

        const tr = document.createElement('tr');

        const name = document.createElement('td')
        name.textContent = user.name
        name.id = 'name'
        //Event listener to call getPosts, passing user id to find correct posts
        name.addEventListener('click', () => getPosts(user.id, user.name))

        const userName = document.createElement('td')
        userName.textContent = user.username
        

        const email = document.createElement('td')
        email.textContent = user.email
      

        tr.appendChild(name);
        tr.appendChild(userName);
        tr.appendChild(email)
        table.appendChild(tr)
    })
)}

//Get and display posts  - initializes from click event in getUsers

function getPosts(id, user) {
    //Clear user table from content to display user posts 
    const content = document.getElementById('content');
    content.textContent=''

    const header = document.createElement('h1')
    header.textContent = `Posts from ${user}`

    const backButton = document.createElement('button');
    backButton.innerHTML = 'Back'
    backButton.addEventListener('click', () => getUsers())

    content.appendChild(header)
    content.appendChild(backButton)

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then(response => response.json())
    .then(data => 
        //API call and loop to display post title and body
        data.forEach(post => {
            const card = document.createElement('div');
            card.id = 'postCard'

            const h5 = document.createElement('h4');
            h5.textContent = post.title;

            const h6 = document.createElement('h5');
            h6.textContent = post.body;

            content.appendChild(card)
            card.appendChild(h5)
            card.appendChild(h6)
        })
    )
}


//Get users is invoked upon page loading
getUsers();