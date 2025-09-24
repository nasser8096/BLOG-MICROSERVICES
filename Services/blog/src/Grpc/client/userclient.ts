import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


// Always point to source proto file, not dist
const PROTO_PATH = path.resolve(process.cwd(), "src/Grpc/proto/user.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDef) as any;

// Create client
const UserService = new proto.user.UserService(
  process.env.USER_GRPC_URL || "localhost:50051",
  grpc.credentials.createInsecure()
);

export default UserService;
