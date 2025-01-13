import TweetNotFound from './tweet-not-found.vue'
import AvatarImg from './avatar-img.vue'
import MediaImg from './media-img.vue'

/**
 * Custom components that the default Twitter theme allows.
 *
 * Note: We only use these components in Server Components, because the root `Tweet`
 * component that uses them is a Server Component and you can't pass down functions to a
 * client component unless they're Server Actions.
 */
export type TwitterComponents = {
  TweetNotFound?: typeof TweetNotFound
  AvatarImg?: typeof AvatarImg
  MediaImg?: typeof MediaImg
}

/**
 * @deprecated Use `TwitterComponents` instead.
 */
export type TweetComponents = TwitterComponents

export const defaultTwitterComponents: TwitterComponents = {
  TweetNotFound: TweetNotFound,
  AvatarImg: AvatarImg,
  MediaImg: MediaImg,
}
