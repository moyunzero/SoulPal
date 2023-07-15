export type CircleType =  {
    createTime: Date;
    description: string;
    expireTime: Date;
    id: number;
    imageUrl: string;
    isDelete: number;
    maxNum: number;
    name: string;
    status: number;
    updateTime: Date;
    userId: number;
    hasJoin: boolean;
    memberList: Array<UserType>;
}