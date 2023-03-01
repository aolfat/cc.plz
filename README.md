## Wtf is cc.plz?

"constructive criticism please"

## What’re we building?

A web app that allows photographers (creators) to post photos along with the original so that users can give feedback in a thread-like format. Very similar to Reddit. Users can post a photograph with the original and a link is generated that they can share with others. Authenticated users can leave constructive criticism “CC” on others’ posts.

## Possible Feature List

- Users should be able to create an account and log in
- Google auth?
- Facebook auth?
- Users should be able to create a post with photos
- Posts should have a shortened URL created that they can share with others (similar to the google docs sharing feature)
- Users can leave feedback (constructive criticism or ‘CC’) on other users' post
  - Users can upload images as their feedback
  - Users can pull up the photo and directly annotate it
- Users can reply to feedback
- Users can like posts
- Users cannot see other feedback until they’ve provided feedback
  - Optional: Users click a button that shows other users’ feedback
  - default: Other’s feedback hidden.
- Users can create groups to that you can send photos. i.e. landscape photography group, portrait group, homies group.
- Privacy settings for link
  - only invited peepz
  - public

## MVP

- [x] Users can create an account using Facebook or google
- [x] Users can create a post
- [ ] Users can comment on a post
- [ ] Users can reply to comments

## Technologies

- Typescript
- Next.js
- Tailwind CSS
- React.js
- (image host site)
- Docker
- PostgreSQL
- NextAuth.js
- tRPC
- Prisma
