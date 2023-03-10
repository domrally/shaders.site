import {
	Mesh,
	NullEngine,
	Scene,
	SceneLoader,
	// Tools,
	VertexBuffer,
} from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
// import axios from 'axios'
// import { GLTFLoader } from 'three-stdlib'

/**
 * fetches the mesh data from the github repo
 */
export class Model {
	static async Load(url: string) {
		// { data } = await axios.get(`${url}`),
		// // Instantiate a loader
		// loader = new GLTFLoader(),
		// assetArrayBuffer: any = await Tools.LoadFileAsync(url, true),
		// assetBlob = new Blob([assetArrayBuffer]),
		// assetUrl = URL.createObjectURL(assetBlob),
		// // Load a glTF resource
		// gltf: any = await loader.parseAsync(
		// 	data,
		// 	`https://cdn.jsdelivr.net/gh/${user}/${repo}@latest/`
		// ),
		// position = gltf.scene.children[0].geometry.attributes.position,
		const scene = new Scene(new NullEngine()),
			gltf = await SceneLoader.ImportMeshAsync(
				'',
				url,
				undefined,
				scene,
				undefined,
				'.glb'
			),
			// gltf = await SceneLoader.AppendAsync(
			// 	url,
			// 	undefined,
			// 	scene,
			// 	undefined,
			// 	'.glb'
			// ),
			mesh = gltf.meshes[1]! as Mesh,
			position = mesh.getVerticesData(VertexBuffer.PositionKind),
			normal = mesh.getVerticesData(VertexBuffer.NormalKind)?.toString(),
			uv = mesh.getVerticesData(VertexBuffer.UVKind)?.toString(),
			index = mesh.getIndices()!.toString()

		// // flip all the triangles
		// for (let i = 0; i < position!.values.length; i += 3) {
		// 	const x = position!.at(i)!,
		// 		y = position!.at(i + 1)!,
		// 		z = position!.at(i + 2)!

		// 	position!.fill(z, i, i + 1)
		// 	position!.fill(y, i + 1, i + 2)
		// 	position!.fill(x, i + 2, i + 3)
		// }

		console.log((gltf.meshes[1]! as Mesh).getVerticesDataKinds())

		return new Model('color', normal, position?.toString(), uv, index)
	}

	private constructor(
		public color: any,
		public normal: any,
		public position: any,
		public uv: any,
		public index: any
	) {}
}
