import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';

export const UserIcon = (props) => (
  <FontAwesome name="user-o" size={24} color="black" {...props} />
);

export const Gender = (props) => (
  <FontAwesome name="transgender" size={24} color="black" {...props} />
);

export const Pencil = (props) => (
  <FontAwesome name="pencil-square-o" size={24} color="black" {...props} />
);

export const Ellipsis = (props) => (
  <FontAwesome name="ellipsis-v" size={24} color="black" {...props} />
);

export const MailIcon = (props) => (
  <Feather name="mail" size={24} color="black" {...props} />
);

export const LockIcon = (props) => (
  <Feather name="lock" size={24} color="black" {...props} />
);

export const Eye_Off = (props) => (
  <Feather name="eye-off" size={24} color="black" {...props} />
);

export const Eye = (props) => (
  <Feather name="eye" size={24} color="black" {...props} />
);

export const Phone = (props) => (
  <Feather name="phone" size={24} color="black" {...props} />
);

export const UserName = (props) => (
  <Feather name="users" size={24} color="black" {...props} />
);

export const Calendar = (props) => (
  <Feather name="calendar" size={24} color="black" {...props} />
);

export const Camera = (props) => (
  <Feather name="camera" size={24} color="black" {...props} />
);

export const Left = (props) => (
  <Feather name="arrow-left" size={20} color="black" {...props} />
);

export const UserFollow = (props) => (
  <Feather name="user-check" size={24} color="black" {...props} />
);

export const UserUnfollow = (props) => (
  <Feather name="user-x" size={24} color="black" {...props} />
);

export const Share = (props) => (
  <Feather name="share-2" size={24} color="black" {...props} />
);

export const Grid = (props) => (
  <Feather name="grid" size={24} color="black" {...props} />
);

export const Bookmark = (props) => (
  <Feather name="bookmark" size={24} color="black" {...props} />
);

export const Logout = (props) => (
  <Feather name="log-out" size={24} color="black" {...props} />
);

export const Chevrons = (props) => (
  <Feather name="chevrons-right" size={24} color="black" {...props} />
);

export const Heart = (props) => (
  <Feather name="heart" size={24} color="black" {...props} />
);

export const LupaIcon = (props) => (
  <Feather name="search" size={24} color="black" {...props} />
);

export const Settings = (props) => (
  <Feather name="settings" size={24} color="black" {...props} />
);

export const Earth = (props) => (
  <FontAwesome6 name="earth-americas" size={24} color="black" {...props} />
);

export const LockBold = (props) => (
  <FontAwesome6 name="lock" size={22} color="black" {...props} />
);

export const Location = (props) => (
  <FontAwesome6 name="location-dot" size={24} color="black" {...props} />
);

export const Compass = (props) => (
  <FontAwesome6 name="compass" size={24} color="black" {...props} />
);

export const Soccer = (props) => (
  <FontAwesome6 name="soccer-ball" size={24} color="black" {...props} />
);

export const Heartpulse = (props) => (
  <FontAwesome6 name="heart-pulse" size={24} color="black" {...props} />
);

export const Chess = (props) => (
  <FontAwesome6 name="chess-knight" size={24} color="black" {...props} />
);

export const HandRock = (props) => (
  <FontAwesome6 name="hand-rock" size={24} color="black" {...props} />
);

export const Explosion = (props) => (
  <FontAwesome6 name="explosion" size={24} color="black" {...props} />
);

export const Lightbulb = (props) => (
  <FontAwesome6 name="lightbulb" size={24} color="black" {...props} />
);

export const Guitar = (props) => (
  <FontAwesome6 name="guitar" size={24} color="black" {...props} />
);

export const CommentIcon = (props) => (
  <FontAwesome6 name="comment-alt" size={24} color="black" {...props} />
);

export const House = (props) => (
  <FontAwesome6 name="house" size={24} color="black" {...props} />
);

export const SendCircle = (props) => (
  <MaterialCommunityIcons name="send" size={24} color="black" {...props}/>
);

export const Trash = (props) => (
  <Feather name="trash-2" size={24} color="black" {...props} />
);

export const Edit = (props) => (
  <Feather name="edit" size={24} color="black" {...props} />
);

export const SendIcon = ({ size = 24, color = "gray" }) => (
  <Ionicons name="send-sharp" size={size} color={color} />
);

export const HeartIcon = ({ liked, size = 28, color = "#462E84", likedColor = "#462E84" }) => (
  <MaterialCommunityIcons
    name={liked ? "heart" : "heart-outline"}
    size={size}
    color={liked ? likedColor : color} 
  />
);

export const BackIcon = () => (
  <MaterialCommunityIcons name="arrow-left" size={30} color="#462E84" />
);

export const ImageIcon = ({ size = 24, color = 'black' }) => (
  <Entypo name="image" size={size} color={color} />
);

export const Bookmarkb = (props) => (
  <FontAwesome name="bookmark" size={24} color="#462E84" {...props} />
);