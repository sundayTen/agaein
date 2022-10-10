import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export enum Article_Order {
  New = 'NEW',
  Old = 'OLD',
  View = 'VIEW'
}

export type Article = {
  __typename?: 'Article';
  articleDetail: ArticleDetail;
  author: User;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  images: Array<Maybe<Scalars['String']>>;
  type: Board_Type;
  updatedAt: Scalars['Date'];
  view: Scalars['Int'];
};

export type ArticleDetail = Lfg | Lfp | Review;

export type ArticleDetailInput = {
  age?: InputMaybe<Scalars['Int']>;
  alarm?: InputMaybe<Scalars['Boolean']>;
  articleId?: InputMaybe<Scalars['ID']>;
  breedId?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  feature?: InputMaybe<Scalars['String']>;
  foundDate?: InputMaybe<Scalars['Date']>;
  gender?: InputMaybe<Gender>;
  gratuity?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  location?: InputMaybe<LocationInput>;
  lostDate?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export enum Board_Type {
  Lfg = 'LFG',
  Lfp = 'LFP',
  Review = 'REVIEW'
}

export enum Breed_Type {
  Cat = 'CAT',
  Dog = 'DOG'
}

export type Bookmark = {
  __typename?: 'Bookmark';
  articleId: Scalars['ID'];
  id: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Breed = {
  __typename?: 'Breed';
  breed: Scalars['String'];
  id: Scalars['ID'];
  type: Scalars['String'];
};

export type Comment = Timestamps & {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  reply: Array<Maybe<Comment>>;
  updatedAt: Scalars['Date'];
};

export type CommentInput = {
  articleId: Scalars['ID'];
  commentId?: InputMaybe<Scalars['ID']>;
  content: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type CrawlingHistory = {
  __typename?: 'CrawlingHistory';
  crawlingKeywords: CrawlingKeywords;
  crawlingResults: Array<Maybe<CrawlingResult>>;
  id: Scalars['ID'];
  user: User;
};

export type CrawlingInput = {
  age?: InputMaybe<Scalars['Int']>;
  breedId: Scalars['ID'];
  foundOrLostDate: Scalars['Date'];
  gender?: InputMaybe<Gender>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  location: LocationInput;
  name?: InputMaybe<Scalars['String']>;
};

export type CrawlingKeywords = {
  __typename?: 'CrawlingKeywords';
  age?: Maybe<Scalars['Int']>;
  breedId?: Maybe<Scalars['ID']>;
  gender?: Maybe<Gender>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  location: Location;
  lostDate: Scalars['Date'];
  name?: Maybe<Scalars['String']>;
};

export type CrawlingResult = {
  __typename?: 'CrawlingResult';
  age?: Maybe<Scalars['Int']>;
  breed?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['Date']>;
  foundOrLostDate?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['String']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  location: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  rank: Scalars['Int'];
  site: Scalars['String'];
  type: Scalars['String'];
};

export enum Finding_Status {
  Done = 'DONE',
  Finding = 'FINDING'
}

export enum Finding_Type {
  Owner = 'OWNER',
  Pet = 'PET'
}

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export type Lfg = {
  __typename?: 'LFG';
  age?: Maybe<Scalars['Int']>;
  alarm?: Maybe<Scalars['Boolean']>;
  breed: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  feature?: Maybe<Scalars['String']>;
  foundDate: Scalars['Date'];
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>;
  location: Location;
  name?: Maybe<Scalars['String']>;
  status: Finding_Status;
  type: Breed_Type;
};

export type Lfp = {
  __typename?: 'LFP';
  age?: Maybe<Scalars['Int']>;
  alarm?: Maybe<Scalars['Boolean']>;
  breed: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  feature?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  gratuity?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>;
  location: Location;
  lostDate: Scalars['Date'];
  name?: Maybe<Scalars['String']>;
  status: Finding_Status;
  type: Breed_Type;
};

export type Location = {
  __typename?: 'Location';
  address: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  roadAddress?: Maybe<Scalars['String']>;
};

export type LocationInput = {
  address: Scalars['String'];
  detail?: InputMaybe<Scalars['String']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  roadAddress?: InputMaybe<Scalars['String']>;
};

export type Login = {
  __typename?: 'Login';
  accessToken: Scalars['String'];
  createdAt: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  kakaoId: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  refreshToken: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  contactUs: Scalars['String'];
  crawling: Scalars['ID'];
  createArticle: Article;
  createBookmark: Bookmark;
  createBreed: Breed;
  createComment: Comment;
  createReport: Report;
  deleteArticle: Scalars['ID'];
  deleteBookmark: Scalars['ID'];
  deleteBreed: Scalars['ID'];
  deleteComment: Scalars['ID'];
  deleteReport: Scalars['ID'];
  done: Scalars['ID'];
  login: Login;
  updateArticle: Article;
  updateComment: Comment;
  updateUser: User;
};


export type MutationContactUsArgs = {
  content: Scalars['String'];
  sender?: InputMaybe<Scalars['String']>;
  subject: Scalars['String'];
};


export type MutationCrawlingArgs = {
  baseInfo: CrawlingInput;
  type: Finding_Type;
};


export type MutationCreateArticleArgs = {
  articleDetail: ArticleDetailInput;
  boardType: Board_Type;
  files: Array<InputMaybe<Scalars['Upload']>>;
};


export type MutationCreateBookmarkArgs = {
  articleId: Scalars['ID'];
};


export type MutationCreateBreedArgs = {
  breed: Scalars['String'];
  type: Breed_Type;
};


export type MutationCreateCommentArgs = {
  articleId: Scalars['ID'];
  commentId?: InputMaybe<Scalars['ID']>;
  content: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};


export type MutationCreateReportArgs = {
  files: Array<InputMaybe<Scalars['Upload']>>;
  report: ReportInput;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID'];
  password?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteBookmarkArgs = {
  articleId: Scalars['ID'];
};


export type MutationDeleteBreedArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
  password?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteReportArgs = {
  id: Scalars['ID'];
  password?: InputMaybe<Scalars['String']>;
};


export type MutationDoneArgs = {
  articleId: Scalars['ID'];
};


export type MutationLoginArgs = {
  kakaoId: Scalars['String'];
  pw: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  articleDetail: ArticleDetailInput;
  files: Array<InputMaybe<Scalars['Upload']>>;
  id: Scalars['ID'];
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String'];
  id: Scalars['ID'];
  password?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Scalars['Upload']>;
  nickname?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type PagingArticle = {
  __typename?: 'PagingArticle';
  articles: Array<Maybe<Article>>;
  currentPage: Scalars['Int'];
  totalPage: Scalars['Int'];
};

export type Profile = {
  __typename?: 'Profile';
  bookmarks: Array<Maybe<Article>>;
  comments?: Maybe<Array<Maybe<ProfileComment>>>;
  lfgs: Array<Maybe<Article>>;
  lfps: Array<Maybe<Article>>;
  reports: Array<Maybe<ProfileReport>>;
  reviews: Array<Maybe<Article>>;
  user: User;
};

export type ProfileComment = Timestamps & {
  __typename?: 'ProfileComment';
  articleId: Scalars['Int'];
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type ProfileReport = Timestamps & {
  __typename?: 'ProfileReport';
  articleDetail: ArticleDetail;
  articleId: Scalars['ID'];
  author: User;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  foundDate: Scalars['Date'];
  id: Scalars['ID'];
  images: Array<Maybe<Scalars['String']>>;
  location: Location;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articleLength: Scalars['Int'];
  articles: PagingArticle;
  bookmarks: Array<Maybe<Bookmark>>;
  breeds: Array<Maybe<Breed>>;
  crawlingHistory: Array<Maybe<CrawlingHistory>>;
  crawlingResults: Array<Maybe<CrawlingResult>>;
  me: User;
  profile: Profile;
  reports: Array<Maybe<Report>>;
  user?: Maybe<User>;
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};


export type QueryArticleLengthArgs = {
  boardType: Board_Type;
};


export type QueryArticlesArgs = {
  boardType: Board_Type;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Article_Order>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryBreedsArgs = {
  type: Breed_Type;
};


export type QueryCrawlingResultsArgs = {
  id: Scalars['ID'];
};


export type QueryReportsArgs = {
  articleId: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Review = {
  __typename?: 'REVIEW';
  articleId?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type Report = Timestamps & {
  __typename?: 'Report';
  articleId: Scalars['ID'];
  author: User;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  foundDate: Scalars['Date'];
  id: Scalars['ID'];
  images: Array<Maybe<Scalars['String']>>;
  location: Location;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type ReportInput = {
  articleId: Scalars['ID'];
  content?: InputMaybe<Scalars['String']>;
  foundDate: Scalars['Date'];
  location: LocationInput;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type Timestamps = {
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type User = Timestamps & {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  kakaoId: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ARTICLE_ORDER: Article_Order;
  Article: ResolverTypeWrapper<Omit<Article, 'articleDetail'> & { articleDetail: ResolversTypes['ArticleDetail'] }>;
  ArticleDetail: ResolversTypes['LFG'] | ResolversTypes['LFP'] | ResolversTypes['REVIEW'];
  ArticleDetailInput: ArticleDetailInput;
  BOARD_TYPE: Board_Type;
  BREED_TYPE: Breed_Type;
  Bookmark: ResolverTypeWrapper<Bookmark>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Breed: ResolverTypeWrapper<Breed>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentInput: CommentInput;
  CrawlingHistory: ResolverTypeWrapper<CrawlingHistory>;
  CrawlingInput: CrawlingInput;
  CrawlingKeywords: ResolverTypeWrapper<CrawlingKeywords>;
  CrawlingResult: ResolverTypeWrapper<CrawlingResult>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  FINDING_STATUS: Finding_Status;
  FINDING_TYPE: Finding_Type;
  File: ResolverTypeWrapper<File>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GENDER: Gender;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LFG: ResolverTypeWrapper<Lfg>;
  LFP: ResolverTypeWrapper<Lfp>;
  Location: ResolverTypeWrapper<Location>;
  LocationInput: LocationInput;
  Login: ResolverTypeWrapper<Login>;
  Mutation: ResolverTypeWrapper<{}>;
  PagingArticle: ResolverTypeWrapper<PagingArticle>;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileComment: ResolverTypeWrapper<ProfileComment>;
  ProfileReport: ResolverTypeWrapper<Omit<ProfileReport, 'articleDetail'> & { articleDetail: ResolversTypes['ArticleDetail'] }>;
  Query: ResolverTypeWrapper<{}>;
  REVIEW: ResolverTypeWrapper<Review>;
  Report: ResolverTypeWrapper<Report>;
  ReportInput: ReportInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Timestamps: ResolversTypes['Comment'] | ResolversTypes['ProfileComment'] | ResolversTypes['ProfileReport'] | ResolversTypes['Report'] | ResolversTypes['User'];
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Article: Omit<Article, 'articleDetail'> & { articleDetail: ResolversParentTypes['ArticleDetail'] };
  ArticleDetail: ResolversParentTypes['LFG'] | ResolversParentTypes['LFP'] | ResolversParentTypes['REVIEW'];
  ArticleDetailInput: ArticleDetailInput;
  Bookmark: Bookmark;
  Boolean: Scalars['Boolean'];
  Breed: Breed;
  Comment: Comment;
  CommentInput: CommentInput;
  CrawlingHistory: CrawlingHistory;
  CrawlingInput: CrawlingInput;
  CrawlingKeywords: CrawlingKeywords;
  CrawlingResult: CrawlingResult;
  Date: Scalars['Date'];
  File: File;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LFG: Lfg;
  LFP: Lfp;
  Location: Location;
  LocationInput: LocationInput;
  Login: Login;
  Mutation: {};
  PagingArticle: PagingArticle;
  Profile: Profile;
  ProfileComment: ProfileComment;
  ProfileReport: Omit<ProfileReport, 'articleDetail'> & { articleDetail: ResolversParentTypes['ArticleDetail'] };
  Query: {};
  REVIEW: Review;
  Report: Report;
  ReportInput: ReportInput;
  String: Scalars['String'];
  Timestamps: ResolversParentTypes['Comment'] | ResolversParentTypes['ProfileComment'] | ResolversParentTypes['ProfileReport'] | ResolversParentTypes['Report'] | ResolversParentTypes['User'];
  Upload: Scalars['Upload'];
  User: User;
}>;

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = ResolversObject<{
  articleDetail?: Resolver<ResolversTypes['ArticleDetail'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['BOARD_TYPE'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  view?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArticleDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleDetail'] = ResolversParentTypes['ArticleDetail']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LFG' | 'LFP' | 'REVIEW', ParentType, ContextType>;
}>;

export type BookmarkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bookmark'] = ResolversParentTypes['Bookmark']> = ResolversObject<{
  articleId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BreedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Breed'] = ResolversParentTypes['Breed']> = ResolversObject<{
  breed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reply?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrawlingHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrawlingHistory'] = ResolversParentTypes['CrawlingHistory']> = ResolversObject<{
  crawlingKeywords?: Resolver<ResolversTypes['CrawlingKeywords'], ParentType, ContextType>;
  crawlingResults?: Resolver<Array<Maybe<ResolversTypes['CrawlingResult']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrawlingKeywordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrawlingKeywords'] = ResolversParentTypes['CrawlingKeywords']> = ResolversObject<{
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  breedId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['GENDER']>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  lostDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CrawlingResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrawlingResult'] = ResolversParentTypes['CrawlingResult']> = ResolversObject<{
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  breed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  foundOrLostDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  site?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LfgResolvers<ContextType = any, ParentType extends ResolversParentTypes['LFG'] = ResolversParentTypes['LFG']> = ResolversObject<{
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  alarm?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  breed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  foundDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['GENDER']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  keyword?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['FINDING_STATUS'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['BREED_TYPE'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LfpResolvers<ContextType = any, ParentType extends ResolversParentTypes['LFP'] = ResolversParentTypes['LFP']> = ResolversObject<{
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  alarm?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  breed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['GENDER']>, ParentType, ContextType>;
  gratuity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  keyword?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  lostDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['FINDING_STATUS'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['BREED_TYPE'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  roadAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginResolvers<ContextType = any, ParentType extends ResolversParentTypes['Login'] = ResolversParentTypes['Login']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kakaoId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  contactUs?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationContactUsArgs, 'content' | 'subject'>>;
  crawling?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCrawlingArgs, 'baseInfo' | 'type'>>;
  createArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'articleDetail' | 'boardType' | 'files'>>;
  createBookmark?: Resolver<ResolversTypes['Bookmark'], ParentType, ContextType, RequireFields<MutationCreateBookmarkArgs, 'articleId'>>;
  createBreed?: Resolver<ResolversTypes['Breed'], ParentType, ContextType, RequireFields<MutationCreateBreedArgs, 'breed' | 'type'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'articleId' | 'content'>>;
  createReport?: Resolver<ResolversTypes['Report'], ParentType, ContextType, RequireFields<MutationCreateReportArgs, 'files' | 'report'>>;
  deleteArticle?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'id'>>;
  deleteBookmark?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteBookmarkArgs, 'articleId'>>;
  deleteBreed?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteBreedArgs, 'id'>>;
  deleteComment?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deleteReport?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteReportArgs, 'id'>>;
  done?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDoneArgs, 'articleId'>>;
  login?: Resolver<ResolversTypes['Login'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'kakaoId' | 'pw'>>;
  updateArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, RequireFields<MutationUpdateArticleArgs, 'articleDetail' | 'files' | 'id'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'content' | 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
}>;

export type PagingArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['PagingArticle'] = ResolversParentTypes['PagingArticle']> = ResolversObject<{
  articles?: Resolver<Array<Maybe<ResolversTypes['Article']>>, ParentType, ContextType>;
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Article']>>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileComment']>>>, ParentType, ContextType>;
  lfgs?: Resolver<Array<Maybe<ResolversTypes['Article']>>, ParentType, ContextType>;
  lfps?: Resolver<Array<Maybe<ResolversTypes['Article']>>, ParentType, ContextType>;
  reports?: Resolver<Array<Maybe<ResolversTypes['ProfileReport']>>, ParentType, ContextType>;
  reviews?: Resolver<Array<Maybe<ResolversTypes['Article']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileCommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileComment'] = ResolversParentTypes['ProfileComment']> = ResolversObject<{
  articleId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileReport'] = ResolversParentTypes['ProfileReport']> = ResolversObject<{
  articleDetail?: Resolver<ResolversTypes['ArticleDetail'], ParentType, ContextType>;
  articleId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  foundDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<QueryArticleArgs, 'id'>>;
  articleLength?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryArticleLengthArgs, 'boardType'>>;
  articles?: Resolver<ResolversTypes['PagingArticle'], ParentType, ContextType, RequireFields<QueryArticlesArgs, 'boardType'>>;
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Bookmark']>>, ParentType, ContextType>;
  breeds?: Resolver<Array<Maybe<ResolversTypes['Breed']>>, ParentType, ContextType, RequireFields<QueryBreedsArgs, 'type'>>;
  crawlingHistory?: Resolver<Array<Maybe<ResolversTypes['CrawlingHistory']>>, ParentType, ContextType>;
  crawlingResults?: Resolver<Array<Maybe<ResolversTypes['CrawlingResult']>>, ParentType, ContextType, RequireFields<QueryCrawlingResultsArgs, 'id'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  reports?: Resolver<Array<Maybe<ResolversTypes['Report']>>, ParentType, ContextType, RequireFields<QueryReportsArgs, 'articleId'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['REVIEW'] = ResolversParentTypes['REVIEW']> = ResolversObject<{
  articleId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['Report'] = ResolversParentTypes['Report']> = ResolversObject<{
  articleId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  foundDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimestampsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timestamps'] = ResolversParentTypes['Timestamps']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Comment' | 'ProfileComment' | 'ProfileReport' | 'Report' | 'User', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kakaoId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profileUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Article?: ArticleResolvers<ContextType>;
  ArticleDetail?: ArticleDetailResolvers<ContextType>;
  Bookmark?: BookmarkResolvers<ContextType>;
  Breed?: BreedResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CrawlingHistory?: CrawlingHistoryResolvers<ContextType>;
  CrawlingKeywords?: CrawlingKeywordsResolvers<ContextType>;
  CrawlingResult?: CrawlingResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  LFG?: LfgResolvers<ContextType>;
  LFP?: LfpResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Login?: LoginResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PagingArticle?: PagingArticleResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileComment?: ProfileCommentResolvers<ContextType>;
  ProfileReport?: ProfileReportResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  REVIEW?: ReviewResolvers<ContextType>;
  Report?: ReportResolvers<ContextType>;
  Timestamps?: TimestampsResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;

