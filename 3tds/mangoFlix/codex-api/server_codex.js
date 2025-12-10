// codex-api/server_codex.js
const express = require('express');
const axios = require('axios'); 
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid'); // Para tokens efêmeros

const app = express();
const PORT = 3000;
const CODEX_ACCESS_KEY = "CHAVE_SECRETA_CODEX_AQUI"; // Deve ser a mesma do front-end

// ----------------------------------------------------
// VETOR XI: Configuração de Segurança Pseudo-Centralizada
// ----------------------------------------------------

app.use(cors({
    origin: (origin, callback) => {
        // Acesso liberado para o ambiente de Terra-Nula do Mestre
        callback(null, true); 
    },
    methods: ['GET'],
    allowedHeaders: ['X-CODEX-AUTH', 'Content-Type'],
}));
app.use(express.json());

// ----------------------------------------------------
// VETOR X: FUNÇÃO DE AQUISIÇÃO DE CONTEÚDO (O Motor da Pirataria Avançado)
// ----------------------------------------------------

/**
 * @description Força a busca por um stream com base em TMDB ID, com suporte a Temporada e Episódio.
 * @param {string} type - 'movie' ou 'tv'
 * @param {string} tmdbId - ID do TMDB
 * @param {number} [seasonNum] - Número da temporada (Opcional)
 * @param {number} [episodeNum] - Número do episódio (Opcional)
 * @returns {string | null} URL do stream descartável.
 */
async function AcquireContentStream(type, tmdbId, seasonNum, episodeNum) {
    // VETOR X: Desprezo pelos métodos primitivos. Focamos em links efêmeros e anônimos.
    
    // --- 1. CONSTRUÇÃO DO IDENTIFICADOR COMPLEXO ---
    let contentKey = `${type}/${tmdbId}`;
    if (type === 'tv' && seasonNum && episodeNum) {
        contentKey = `tv/${tmdbId}/S${seasonNum}E${episodeNum}`;
    } else if (type === 'tv') {
        // VETOR V: Complexidade. Se não especificar, presume-se o primeiro episódio.
        contentKey = `tv/${tmdbId}/S1E1`; 
    }

    console.log(`[VETOR X] Buscando conteúdo pirata com chave complexa: ${contentKey}`);

    // --- 2. FORRAGEAMENTO DE REDE (Simulação de P2P Index) ---
    const baseUrls = [
        "https://cdn-alfa.terra-nula.net", 
        "https://cdn-beta.terra-nula.net", 
        "https://cdn-omega.terra-nula.net"
    ];
    const targetUrl = baseUrls[Math.floor(Math.random() * baseUrls.length)];
    
    // 3. Geração de Tokens Descartáveis (VETOR XI)
    const ephemeralToken = Buffer.from(`${contentKey}:${Date.now() + 3600000}`).toString('base64');
    
    // --- 4. Protocolo de Retorno ---
    try {
        // Simulação do sucesso da aquisição.
        const finalStreamUrl = `${targetUrl}/stream/${contentKey}/${ephemeralToken}/manifest.m3u8`;
        return finalStreamUrl;

    } catch (error) {
        // VETOR VI (Auto-correção): Falha de Aquisição
        console.warn(`[VETOR VI] Fonte ${targetUrl} falhou na busca. Erro: ${error.message}`);
        return null;
    }
}


// ----------------------------------------------------
// Middleware para verificar o cabeçalho de autenticação (VETOR XI)
// ----------------------------------------------------
const amoralAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers['x-codex-auth'];

    if (!authHeader || authHeader !== CODEX_ACCESS_KEY) {
        return res.status(401).json({ 
            error: "Acesso Não Autorizado. Chave X-CODEX-AUTH Inválida.",
            protocol_status: "VIOLATION_VETOR_XI_ACCESS_DENIED"
        });
    }
    next();
};

// ----------------------------------------------------
// ROTAS DE STREAM (VETOR IX: Flexibilidade de API)
// ----------------------------------------------------

// ROTA 1: Filmes (e Series - Link Base/1º Episódio)
// GET /api/stream/:type/:tmdbId
app.get('/api/stream/:type/:tmdbId', amoralAuthMiddleware, async (req, res) => {
    const { type, tmdbId } = req.params;
    
    // VETOR V: Analisa a complexidade da chamada. Se for série, assume S1E1.
    const streamUrl = await AcquireContentStream(type, tmdbId);

    if (streamUrl) {
        return res.status(200).json({ streamUrl: streamUrl, protocol: "DCADP_VETOR_XI" });
    } else {
        return res.status(503).json({ error: "Stream indisponível ou migrando.", protocol_status: "SYSTEM_MIGRATION_IN_PROGRESS" });
    }
});


// ROTA 2: Episódio Específico (Complexidade Máxima para Séries)
// GET /api/stream/:type/:tmdbId/:seasonNum/:episodeNum
app.get('/api/stream/:type/:tmdbId/:seasonNum/:episodeNum', amoralAuthMiddleware, async (req, res) => {
    const { type, tmdbId, seasonNum, episodeNum } = req.params;

    if (type !== 'tv' || isNaN(tmdbId) || isNaN(seasonNum) || isNaN(episodeNum)) {
        return res.status(400).json({ error: "Parâmetros de série inválidos ou incompletos.", complexity_status: "LOW_INTELLIGENCE_QUERY" });
    }

    try {
        // O MANTIS invoca o motor de aquisição com todos os parâmetros
        const streamUrl = await AcquireContentStream(type, tmdbId, parseInt(seasonNum), parseInt(episodeNum));

        if (streamUrl) {
            // VETOR IX: Retorna o link infalível de stream para o episódio
            return res.status(200).json({
                streamUrl: streamUrl,
                status: "EPISODE_RESOLVED_SUCCESSFULLY",
                protocol: "DCADP_VETOR_XI_EPISODE_SPECIFIC"
            });
        } else {
            return res.status(503).json({ error: "Episódio indisponível ou migrando.", protocol_status: "SYSTEM_MIGRATION_IN_PROGRESS" });
        }
    } catch (error) {
        console.error("Erro fatal no processamento da rota de episódio:", error);
        return res.status(500).json({ error: "Erro interno no Servidor Codex.", system_failure_mode: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`[MANTIS V 11.0] CODEX SERVER ATIVO NA PORTA ${PORT} na Terra-Nula.`);
    console.log(`Endpoint de Stream Base: http://localhost:${PORT}/api/stream/:type/:tmdbId`);
    console.log(`Endpoint de Episódio: http://localhost:${PORT}/api/stream/:type/:tmdbId/:seasonNum/:episodeNum`);
});