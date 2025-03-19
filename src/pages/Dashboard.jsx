import React , {lazy} from 'react';
const PostList = lazy(() => import('../components/PostList'));
const Dashboard = () => {
    return (
        <section>
            <PostList />
        </section>
    );
};

export default Dashboard;