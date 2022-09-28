"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepositoryLanguage = exports.getStarredRepositories = void 0;
const axios_1 = __importDefault(require("axios"));
const githubBaseUrl = 'https://api.github.com';
const githubAuthorizationHeader = process.env.NODE_ENV === 'development'
    ? {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
    }
    : undefined;
const getStarredRepositories = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${githubBaseUrl}/users/ssaavedraa/starred`;
    const githubRawData = yield axios_1.default.get(url, githubAuthorizationHeader);
    return githubRawData.data.map((repository) => {
        return {
            id: repository.id,
            name: repository.name,
            url: repository.html_url,
            sshClone: repository.ssh_url,
            htmlClone: repository.clone_url
        };
    });
});
exports.getStarredRepositories = getStarredRepositories;
const getRepositoryLanguage = (repositoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${githubBaseUrl}/repos/ssaavedraa/${repositoryName}/languages`;
    const languages = yield axios_1.default.get(url, githubAuthorizationHeader);
    return calculateLanguagePercentage(languages.data);
});
exports.getRepositoryLanguage = getRepositoryLanguage;
const calculateLanguagePercentage = (languages) => {
    const languageWeights = Object.values(languages);
    const languageKeys = Object.keys(languages);
    const totalWeight = languageWeights.reduce((partial, value) => partial + value);
    let languagesWithPercentage = {};
    languageKeys.forEach((languageKey, index) => {
        languagesWithPercentage = Object.assign(Object.assign({}, languagesWithPercentage), { [languageKey]: ((languageWeights[index] * 100) / totalWeight).toFixed(2) });
    });
    return languagesWithPercentage;
};
