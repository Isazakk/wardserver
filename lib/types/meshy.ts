export interface MeshyModelUrls {
  glb: string;
  usdz: string;
  fbx: string;
  obj: string;
}

export interface MeshyTextureUrls {
  albedo: string;
  normal: string;
  roughness: string;
  metallic: string;
  ao: string;
}

export interface MeshyResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  modelUrls: MeshyModelUrls;
  textureUrls: MeshyTextureUrls;
  error?: string;
}

export interface TextTo3DRequest {
  prompt: string;
  style?: string;
  format?: 'glb' | 'usdz' | 'fbx' | 'obj';
}

export interface ImageTo3DRequest {
  imageUrl: string;
  format?: 'glb' | 'usdz' | 'fbx' | 'obj';
} 