const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchBtn = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

const URL = 'https://jsonplaceholder.typicode.com/posts'

function sendHttpRequest(method, url, data) {
    //     ==========================================================
    //     XMLHttpRequest를 이용한 방식
    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.setRequestHeader('Content-Type', 'application/json');

    //     // xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    //     xhr.open(method, url);

    //     xhr.responseType = 'json'; // 1. 설정을 하거나(항상 가능한 것은 아님)
    //     // const listOfPosts = JSON.parse(xhr.response); 2. 헬퍼를 사용하거나(JSON.stringify)

    //     xhr.onload = function() {
    //         if (xhr.status >= 200 && xhr.status < 300) {
    //             resolve(xhr.response);
    //         } else {
    //             reject(new Error('Something went wrong!'));
    //         }
    //     }

    //     xhr.onerror = function() {
    //         reject(new Error('Failed to send request!'));
    //     }

    //     xhr.send(JSON.stringify(data));
    // });

    // return promise;
    //     ==========================================================
    //     fetch() API를 이용한 방식
    return fetch(url, {
        method: method,
        // body: JSON.stringify(data), // 일반적인 데이터를 전송받을 경우
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        body: data, // FormData를 전송받을 경우
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json(); // .json | .text | .blob
        } else {
            return response.json().then(errData => {
                throw new Error('Something went wrong - server-side.');
            });
        }
    }).catch(error => {
        throw new Error('Failed to send request!');
    });
}

// function fetchPosts() { // then을 이용한 방식(xhr를 가져올 방법은?)
//     sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
//         responseData => {
//             const listOfPosts = responseData.response;
//             for (const post of listOfPosts) {
//                 const postEl = document.importNode(postTemplate.content, true);
//                 postEl.querySelector('h2').textContent = post.title.toUpperCase();
//                 postEl.querySelector('p').textContent = post.body;
//                 listElement.append(postEl);
//             }
//         }
//     );
// }

async function fetchPosts() { // async, await을 이용한 방식
    try {
        const responseData = await sendHttpRequest('GET', URL)
        for (const post of responseData) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }
    } catch (error) {
        alert(error.message);
    }
}

async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    const fd = new FormData(form); // form을 입력하면 직접 찾도록 설정 가능
    // fd.append('title', title); // name 속성과 일치해야함
    // fd.append('body', content); // name 속성과 일치해야함
    fd.append('userId', userId); // form에 포함되지 않는 데이터도 추가 가능

    // sendHttpRequest('POST', URL, post); 일반적인 데이터 전송
    sendHttpRequest('POST', URL, fd); // FormData 전송
}

fetchBtn.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;

    createPost(enteredTitle, enteredContent);
})

postList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `${URL}/${postId}`);
    }
});