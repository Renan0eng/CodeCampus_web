import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import Avatar from '@mui/joy/Avatar';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import SendIcon from '@mui/icons-material/Send'

import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/joy';

export default function FeedContent({ posts }) {
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date();
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

  const user = JSON.parse(sessionStorage.getItem('user'));

  const [comment, setComment] = React.useState('');

  const [comments, setComments] = React.useState([{
    comment: 'Text comet 1',
    authorAvatar: user.photoURL,
    authorName: user.displayName,
    date: formattedDate,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam massa, eget aliquam nunc nisl sit amet nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam massa, eget aliquam nunc nisl sit amet nisl.',
    relevance: 0,
  },
  {
    comment: 'Text comet 1',
    authorAvatar: user.photoURL,
    authorName: user.displayName,
    date: formattedDate,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam massa, eget aliquam nunc nisl sit amet nisl. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam massa, eget aliquam nunc nisl sit amet nisl.',
    relevance: 0,
  }
]);

  const navigate = useNavigate();

  

  const [openImage, setOpenImage] = React.useState(false);
  const [imagen, setImagen] = React.useState({});
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);

  React.useEffect(() => {
    console.log(`FeedContent`, user);
  }, []);

  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: 'sm',
        p: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Avatar
            src={posts.authorAvatar}
            srcSet={posts.authorAvatar}
            sx={{ borderRadius: 'xl' }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography level="body2" textColor="text.primary" mb={0.5}>
              {posts.authorName}
            </Typography>
            <Typography level="body3" textColor="text.tertiary">
              {posts.date}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', height: '32px', flexDirection: 'row', gap: 1.5 }}
        >
          <IconButton size="sm" variant="outlined" color="neutral"
            onClick={() => {
              console.log(`ArrowUpward ${posts.title}`);
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <Typography level="body2" pt={0.5} textColor="text.primary" mb={0.5}>
            {posts.relevance}
          </Typography>
          <IconButton size="sm" variant="outlined" color="neutral"
            onClick={() => {
              console.log(`ArrowDownward ${posts.title}`);
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <Typography level="h5" textAlign='center' textColor="text.primary">
          {posts.title}
        </Typography>
      </Box>
      <Box p={2} dangerouslySetInnerHTML={{ __html: posts.desc }} />
      {posts.images ? <>
        <Divider />
        <Typography fontWeight="md" fontSize="sm" mt={2} mb={2}>
          Images
        </Typography>
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
            '& > div': {
              boxShadow: 'none',
              '--Card-padding': '0px',
              '--Card-radius': theme.vars.radius.sm,
            },
          })}
        >
          {posts.images && posts.images.map((image) => (<>
            <Box
              sx={(theme) => ({
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                '& > div': {
                  boxShadow: 'none',
                  '--Card-padding': '0px',
                  '--Card-radius': theme.vars.radius.sm,
                },
              })}
            >
              <Card variant="outlined" >
                <AspectRatio ratio="1" sx={{ minWidth: 100 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenImage();
                    setImagen(image);
                    console.log(`image`, image);
                  }}
                >
                  <img
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    src={image}
                    srcSet={image}
                    alt="Yosemite National Park"
                  />
                </AspectRatio>
              </Card>
            </Box>

            <Modal
              open={openImage}
              onClose={handleCloseImage}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  bgcolor: 'background.paper',
                  border: '2px solid',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 'xl',
                }}
              >
                <img
                  src={imagen}
                  srcSet={imagen}
                  width="100%"
                />
              </Box>
            </Modal>
          </>))}
        </Box></> : null}
      {/* add comentarios */}
      <Divider />
      <Typography fontWeight="md" fontSize="sm" mt={2} mb={2}>
          comments
        </Typography>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mt: 2,
          }}
        >

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Avatar
              src={user && user.photoURL ? user.photoURL : 'https://www.w3schools.com/howto/img_avatar.png'}
              srcSet={user && user.photoURL ? user.photoURL : 'https://www.w3schools.com/howto/img_avatar.png'}
              sx={{ borderRadius: 'xl' }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography level="body2" textColor="text.primary" mb={0.5}>
                {user && user.displayName ? user.displayName : 'Anonimo'}
              </Typography>
              <Typography level="body3" textColor="text.tertiary">
                {formattedDate}
              </Typography>
            </Box>
          </Box>
          {/* input comentario */}
        </Box>
        <Box>
          <Input
            sx={{ mt: 1 }}
            placeholder="Add a comment"
            size="sm"
            variant="outlined"
            color="neutral"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
        {/* btn enviar */}
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mt: 2,
            mb: 2,
          }}
        >
          <Button
            size="sm"
            variant="outlined"
            color="primary"
            onClick={() => {
              console.log(`Send ${posts.title}`);
              if (comment) {
                setComments([...comments, {
                  id: comments.length + 1,
                  desc: comment,
                  authorName: user && user.displayName ? user.displayName : 'Anonimo',
                  authorAvatar: user && user.photoURL ? user.photoURL : 'https://www.w3schools.com/howto/img_avatar.png',
                  date: formattedDate,
                }]);
                setComment('');
              }
            }}
            sx={{ mt: 1 }}
          >
            <SendIcon/>
            Send
          </Button>
        </Box>
       

      </Box>



      {comments && comments.map((content, index) => (<>
        <Divider />
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            mt: 2,
            '& > div': {
              boxShadow: 'none',
              '--Card-padding': '0px',
              '--Card-radius': theme.vars.radius.sm,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              width: '90%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 2,
              '& > div': {
                boxShadow: 'none',
                '--Card-padding': '0px',
                '--Card-radius': theme.vars.radius.sm,
              },
            })}
          >
            <Avatar
              src={content.authorAvatar}
              srcSet={content.authorAvatar}
              sx={{ borderRadius: 'xl', width: 30, height: 30 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <Typography level="body2">
                {content.authorName}
              </Typography>
              <Typography level="body2" textColor="#999" fontSize={10} >
                {content.date}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignItems: 'start',
              pb: 0.5,
              width: '100%',
              '& > div': {
                boxShadow: 'none',
                '--Card-padding': '0px',
                '--Card-radius': theme.vars.radius.sm,
              },
            })}
          >
            <Typography level="body2" textColor="#999" mb={0.5}>
              {content.desc}
            </Typography>
          </Box>
        </Box>
      </>))}
    </Sheet>
  );
}
