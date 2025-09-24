import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import User from "../../model/User.js";

// ----------------------
// Fix __dirname in ESM
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Resolve proto file safely (relative to project root or dist folder)
const PROTO_PATH = path.resolve(process.cwd(), "src/Grpc/proto/user.proto");


// ----------------------
// Load Proto Definition
// ----------------------
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDef) as any;

// ----------------------
// gRPC Service Methods
// ----------------------
const getUserProfile = async (call: any, callback: any) => {
  try {
    const user = await User.findById(call.request.id);

    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }

    callback(null, { user });
  } catch (err) {
    console.error("❌ gRPC error in GetUserProfile:", err);
    callback({
      code: grpc.status.INTERNAL,
      message: "Error fetching user",
    });
  }
};

// ----------------------
// Start gRPC Server
// ----------------------
export const startGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(proto.user.UserService.service, {
    GetUserProfile: getUserProfile,
  });

  const PORT = process.env.GRPC_PORT || "50051";

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error("❌ Failed to bind gRPC server:", err);
        return;
      }
      server.start();
      console.log(`🚀 gRPC server running at 0.0.0.0:${port}`);
    }
  );
};
