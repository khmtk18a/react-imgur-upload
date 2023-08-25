export { };

declare global {
  interface ItemsStateProp {
    items: string[]
  }

  /**
   * @see https://app.quicktype.io/?l=ts
   */
  interface ImgurResponse {
    data: Data;
    success: boolean;
    status: number;
  }

  interface Data {
    id: string;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    favorite: boolean;
    account_id: number;
    is_ad: boolean;
    in_most_viral: boolean;
    tags: string[];
    ad_type: number;
    ad_url: string;
    in_gallery: boolean;
    deletehash: string;
    name: string;
    link: string;
  }
}
