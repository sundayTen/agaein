import { Article, Comment, Maybe, ProfileReport, Report, ReportInput, Scalars, User } from './types';

export type Optional<T> = Maybe<T> | undefined;

export type Date = Scalars['Date'];
export type Upload = Scalars['Upload'];
export type ID = Scalars['Int'] | Scalars['ID'];

export type UserResponse = User & {
    id?: Scalars['Int'];
    accessToken?: Scalars['String'];
    refreshToken?: Scalars['String'];
};

export type UserForm = {
    kakao_id?: Optional<Scalars['String']>;
    email?: Optional<Scalars['String']>;
    nickname?: Optional<Scalars['String']>;
    phoneNumber?: Optional<Scalars['String']>;
    createdAt?: Scalars['Date'];
    updatedAt: Scalars['Date'];
};

export type JwtPayload = {
    userId: Scalars['Int'];
    kakaoId: Scalars['String'];
    iat: Scalars['Int'];
    exp: Scalars['Int'];
};

export type ImageForm = {
    userId: Scalars['Int'];
    url: Scalars['String'];
};

export type RawReport = Report & {
    password: Scalars['String'];
    userId: Scalars['Int'];
};

export type ReportForm = ReportInput & {
    userId?: Scalars['Int'];
    createdAt?: Scalars['Date'];
    updatedAt?: Scalars['Date'];
};

export type UserId = {
    userId?: Scalars['Int'];
};

export type ObjectId = {
    id?: Scalars['Int'];
};

export type ProfileReportWithUserId = UserId & ProfileReport;

export type ReportWithUserId = UserId & Report;

export type ArticleWithUserId = UserId & Article;

export type CommentWithUserId = UserId & Comment & ObjectId;
