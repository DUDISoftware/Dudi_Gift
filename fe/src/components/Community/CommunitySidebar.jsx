import CommunityNotice from './CommunityNotice';
import PeopleSuggestion from './PeopleSuggestion';
import RecentPosts from '../Card/RecentPosts';
import UpcomingPrograms from './UpcomingPrograms';
import TagFilter from '../Card/TagFilter';

const CommunitySidebar = () => (
  <div className="space-y-6">
    <CommunityNotice />
    <PeopleSuggestion />
    <UpcomingPrograms />
    <RecentPosts />
  </div>
);
export default CommunitySidebar;
