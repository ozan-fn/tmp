import { auth } from "@/lib/auth";

async function main() {
    auth.api.signUpEmail({
        body: {
            name: "Admin",
            email: "admin@example.com",
            password: "password",
            image: "https://i.ibb.co/nqXmK174/Sakayori-Iroha.jpg",
        },
    });
}
main();
