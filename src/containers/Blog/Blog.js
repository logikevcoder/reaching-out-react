import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [], // initial state
        selectedPostId: null
    }

    // using this lifecycle method as it's a passing function used for axios
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts') // get the data from this api
        .then(response => {
            const posts = response.data.slice(0, 4); // only store the first 4 returned items
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Kevin'
                }
            });
            this.setState({posts: updatedPosts}) // set the apis response data to be the posts array items
        });
    }

    postClickHandler = (id) => { // pass in the id based on the target that was clicked below in the click handler
      this.setState({selectedPostId: id}); // update state id to be new clicked id
    }

    render () {
        // create variable that maps over returned posts array and creates a dynamic component
        const posts = this.state.posts.map((post) => {
            return <Post 
                      key={post.id} 
                      title={post.title} 
                      author={post.author}
                      clicked={() => this.postClickHandler(post.id)} /> // pass in id of the post that was clicked to the function above
        })

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} /> {/* update the post to be the new clicked post */}
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;