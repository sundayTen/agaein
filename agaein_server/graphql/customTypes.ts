import { Maybe, Scalars, User } from "./types";

export type Optional<T> = Maybe<T> | undefined;

export type Date = Scalars["Date"];
export type Upload = Scalars["Upload"];

export type UserResponse = User & {
    id?: Scalars["Int"]
    accessToken?: Scalars["String"];
    refreshToken?: Scalars["String"];
};

export type UserForm = {
    kakao_id?: Optional<Scalars["String"]>;
    email?: Optional<Scalars["String"]>;
    nickname?: Optional<Scalars["String"]>;
    phoneNumber?: Optional<Scalars["String"]>;
    createdAt?: Scalars["Date"];
    updatedAt: Scalars["Date"];
};

export type JwtPayload = {
    userId: Scalars["Int"];
    kakaoId: Scalars["String"];
    iat: Scalars["Int"];
    exp: Scalars["Int"];
};

export type ImageForm = {
    userId: Scalars["Int"];
    url: Scalars["String"];
};


