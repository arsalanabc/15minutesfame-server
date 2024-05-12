import { PostModelType } from "../types/types";

export interface CachePost<T> {
    value: T;
    ttl: Date; // 
    createdAt: number; // Timestamp of when the item was added to the cache
}
const TEN_SECONDS = 1000 * 10 // add delay for post update

class CacheService {
    private cachePost : CachePost<PostModelType> | undefined = undefined;

    constructor() {
    }
    

    get():  CachePost<PostModelType> | undefined {
        const cacheItem = this.cachePost;

        if (cacheItem) {
            const currentTime = new Date();
            if (currentTime.getTime() + TEN_SECONDS > cacheItem.ttl.getTime()) {
                return undefined;
            }

            return cacheItem;
        }

        return undefined;
    }

    set(post: PostModelType, ttl:Date ): void {
        this.cachePost = {
            value:post,
            ttl: ttl,
            createdAt: Date.now()
        };
    }


}

export default new CacheService();