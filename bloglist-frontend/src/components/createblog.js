import React from 'react'


const createNewBlog = ({createBlog, title, author, url, setTitle, setAuthor, setUrl }) => {
    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={createBlog}>
            <div>
              <input
                type="text"
                value={title}
                name="Title"
                placeholder="Title"
                onChange={setTitle}
              />
            </div>
            <div>
              <input
                type="text"
                value={author}
                name="Author"
                placeholder="Author"
                onChange={setAuthor}
              />
            </div>
            <div>
              <input
              type="text"
              value={url}
              name="Url"
              placeholder="Url"
              onChange={setUrl}
            />
            </div>
            <button type="submit">Create</button>
          
          </form>
        </div>
    )
}

export default createNewBlog