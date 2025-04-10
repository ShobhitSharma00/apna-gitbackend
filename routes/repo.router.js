const express=require("express");
const repoController=require("../controllers/repo.Controller")

const repoRouter=express.Router();

// Most specific FIRST
repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.get("/repo/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userID", repoController.fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityById);

// MOST GENERIC LAST
repoRouter.get("/repo/:id", repoController.fetchRepositoryById);

module.exports = repoRouter;
