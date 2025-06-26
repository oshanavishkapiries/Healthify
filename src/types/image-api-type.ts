export interface ImageUploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    filename: string;
    size: number;
    public_id: string;
    width: number;
    height: number;
    format: string;
    created_at: string;
    original_filename: string;
    resource_type: string;
  };
}

export interface ImageUploadError {
  success: false;
  message: string;
  error?: string;
}
