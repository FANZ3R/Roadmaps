/* Topic library: deep learning. Format is described in core.js. */
RM.addTopics({
  "dl-foundations": {
    title: "Neural network foundations",
    hi: ["CampusX: 100 Days of Deep Learning", "https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn", "Perceptron se backprop, optimizers aur regularization tak"],
    subs: [
      "Perceptrons, MLPs and the universal approximation intuition",
      "Activation functions: sigmoid, tanh, ReLU, GELU",
      "The forward pass and computational graphs",
      "Backpropagation derived by hand",
      "Losses: MSE, and cross-entropy with softmax",
      "Initialization: Xavier and He",
      "Optimizers: SGD, momentum, RMSProp, Adam, AdamW",
      "Normalization: batch norm and layer norm",
      "Regularization: dropout, weight decay, augmentation",
      "Learning rate schedules and warmup"
    ],
    res: [
      ["Neural Networks: Zero to Hero (Andrej Karpathy)", "https://karpathy.ai/zero-to-hero.html", "video"],
      ["Neural networks (3Blue1Brown)", "https://www.3blue1brown.com/topics/neural-networks", "video"],
      ["Dive into Deep Learning", "https://d2l.ai/", "book"],
      ["Understanding Deep Learning (Simon Prince)", "https://udlbook.github.io/udlbook/", "book"]
    ],
    tip: "Karpathy ki series ke saath code khud type karo, copy-paste nahi. micrograd apne haath se likh liya to backprop hamesha ke liye clear."
  },

  "pytorch": {
    title: "PyTorch",
    hi: ["CampusX: Practical Deep Learning using PyTorch", "https://www.youtube.com/playlist?list=PLKnIA16_Rmvboy8bmDCjwNHgTaYH2puK7", "Tensors, autograd aur training pipeline se shuru; poora playlist practical hai"],
    subs: [
      "Tensors, devices and dtypes",
      "Autograd and requires_grad",
      "nn.Module, parameters and state_dict",
      "Dataset and DataLoader",
      "A clean training and evaluation loop",
      "Saving, loading and resuming from checkpoints",
      "Mixed precision with torch.autocast",
      "Debugging shapes, NaNs and exploding gradients",
      "torch.compile basics"
    ],
    res: [
      ["PyTorch tutorials: learn the basics", "https://pytorch.org/tutorials/beginner/basics/intro.html", "docs"],
      ["Learn PyTorch for Deep Learning (Daniel Bourke)", "https://www.learnpytorch.io/", "course"]
    ],
    tip: "Ek training loop template banao jo tum har project mein reuse karo. Shapes print karke debug karna sharm ki baat nahi, sab karte hain."
  },

  "dl-practical": {
    title: "Practical deep learning and training recipes",
    hi: ["CampusX: 100 Days of Deep Learning", "https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn", "Regularization, dropout, batch norm aur hyperparameter tuning wale videos"],
    subs: [
      "Transfer learning and fine-tuning pretrained models",
      "Overfit one batch first, then scale up",
      "Learning rate finder and one-cycle schedules",
      "Data augmentation that matches the domain",
      "Experiment tracking with MLflow or Weights and Biases",
      "Reading and diagnosing training curves",
      "Systematic hyperparameter tuning"
    ],
    res: [
      ["Practical Deep Learning for Coders (fast.ai)", "https://course.fast.ai/", "course"],
      ["A Recipe for Training Neural Networks (Karpathy)", "https://karpathy.github.io/2019/04/25/recipe/", "article"],
      ["Deep Learning Tuning Playbook (Google Research)", "https://github.com/google-research/tuning_playbook", "article"]
    ],
    tip: "Karpathy ka 'recipe' post har DL project se pehle padho. Ek batch pe overfit nahi hua to bug hai, bada model mat lagao."
  },

  "cnn-cv": {
    title: "CNNs and computer vision",
    hi: ["CampusX: 100 Days of Deep Learning", "https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn", "CNN section: convolution, pooling, architectures aur transfer learning"],
    subs: [
      "Convolutions, padding, stride, pooling, receptive fields",
      "Classic architectures: LeNet, VGG, ResNet",
      "Transfer learning for image classification",
      "Object detection: anchors, YOLO-style and DETR-style models",
      "Segmentation: U-Net and masks",
      "Vision Transformers (ViT)",
      "CLIP and image-text embeddings",
      "Augmentation and metrics: IoU, mAP"
    ],
    res: [
      ["CS231n: Deep Learning for Computer Vision (Stanford) notes", "https://cs231n.github.io/", "course"],
      ["Hugging Face Community Computer Vision Course", "https://huggingface.co/learn/computer-vision-course", "course"]
    ],
    tip: "CS231n ke notes classic hain, assignments bhi karo. Detection aur segmentation ke metrics (IoU, mAP) khud code karke samjho."
  },

  "seq-models": {
    title: "Sequence models",
    hi: ["CampusX: 100 Days of Deep Learning", "https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn", "RNN, LSTM aur GRU section"],
    subs: [
      "Recurrent networks and backprop through time",
      "Vanishing gradients; LSTM and GRU",
      "Sequence-to-sequence models",
      "The attention mechanism before transformers"
    ],
    res: [
      ["Understanding LSTM Networks (Chris Olah)", "https://colah.github.io/posts/2015-08-Understanding-LSTMs/", "article"],
      ["The Unreasonable Effectiveness of RNNs (Karpathy)", "https://karpathy.github.io/2015/05/21/rnn-effectiveness/", "article"],
      ["Dive into Deep Learning: recurrent networks chapters", "https://d2l.ai/", "book"]
    ],
    tip: "Isme zyada time mat lagao. Bas itna samjho ki RNN kahan fail hote the, taaki attention kyun aaya ye clear ho jaaye."
  },

  "transformers": {
    title: "Transformers, deeply",
    hi: ["CampusX: 100 Days of Deep Learning", "https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn", "Attention, self-attention aur transformer architecture wala last section"],
    subs: [
      "Self-attention: queries, keys, values, scaled dot product",
      "Multi-head attention",
      "Positional information: sinusoidal, learned, RoPE",
      "Residual connections, layer norm and the MLP block",
      "Encoder-only, decoder-only, encoder-decoder",
      "Causal masking and autoregressive generation",
      "The KV cache and why inference is memory-bound",
      "Implement a small GPT in PyTorch"
    ],
    res: [
      ["The Illustrated Transformer (Jay Alammar)", "https://jalammar.github.io/illustrated-transformer/", "article"],
      ["Let's build GPT: from scratch, in code (Karpathy)", "https://www.youtube.com/watch?v=kCc8FmEb1nY", "video"],
      ["The Annotated Transformer (Harvard NLP)", "https://nlp.seas.harvard.edu/annotated-transformer/", "article"],
      ["Attention Is All You Need", "https://arxiv.org/abs/1706.03762", "paper"]
    ],
    tip: "Illustrated Transformer se picture banao, phir Karpathy ke saath code likho. Attention ko matrix shapes ke saath paper pe likh sako, tab ye topic done."
  },

  "generative-models": {
    title: "Generative models",
    subs: [
      "Autoencoders and variational autoencoders",
      "GANs: generator vs discriminator",
      "Diffusion models: forward noising and learned denoising",
      "Latent diffusion and text conditioning",
      "Evaluating generative models"
    ],
    res: [
      ["Hugging Face Diffusion Models Class", "https://github.com/huggingface/diffusion-models-class", "course"],
      ["What are Diffusion Models? (Lilian Weng)", "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/", "article"],
      ["Understanding Deep Learning: generative model chapters", "https://udlbook.github.io/udlbook/", "book"]
    ],
    tip: "Diffusion ka math bhaari lagta hai. Pehle HF class ka code chalao, phir Lilian Weng ka post padho, dono milke clear hoga."
  },

  "distributed-training": {
    title: "Training at scale",
    subs: [
      "GPU memory anatomy: weights, gradients, optimizer states, activations",
      "Mixed precision: fp16, bf16, loss scaling",
      "Gradient accumulation and gradient checkpointing",
      "Data parallelism with DDP",
      "Sharded training: FSDP and ZeRO",
      "Tensor and pipeline parallelism concepts",
      "Profiling utilization and finding bottlenecks"
    ],
    res: [
      ["The Ultra-Scale Playbook (Hugging Face)", "https://huggingface.co/spaces/nanotron/ultrascale-playbook", "book"],
      ["Getting started with distributed data parallel (PyTorch)", "https://pytorch.org/tutorials/intermediate/ddp_tutorial.html", "docs"],
      ["How to Scale Your Model (Google DeepMind)", "https://jax-ml.github.io/scaling-book/", "book"]
    ],
    tip: "Memory ka hisaab paper pe karna seekho: 7B model ko train karne mein kitni GPU memory lagegi, aur kyun. Ultra-Scale Playbook iske liye best hai."
  },

  "gpu-performance": {
    title: "GPU and performance fundamentals",
    subs: [
      "GPU architecture: SMs, warps, memory hierarchy",
      "Compute-bound vs memory-bound vs overhead-bound",
      "Arithmetic intensity and the roofline model",
      "Kernel fusion, and why FlashAttention is fast",
      "Writing a simple kernel in Triton",
      "CUDA programming model basics"
    ],
    res: [
      ["Making Deep Learning Go Brrrr From First Principles (Horace He)", "https://horace.io/brrr_intro.html", "article"],
      ["GPU MODE lectures", "https://github.com/gpu-mode/lectures", "course"],
      ["Triton tutorials", "https://triton-lang.org/main/getting-started/tutorials/index.html", "docs"]
    ],
    tip: "Horace He ka post ek ghante mein padh jaata hai aur performance ki poori soch badal deta hai. Kernel likhna optional hai, bottleneck pehchaanna zaroori."
  },

  "efficient-inference": {
    title: "Model compression and efficient inference",
    subs: [
      "Quantization: post-training vs quantization-aware, int8 and int4",
      "LLM quantization formats: GPTQ, AWQ, GGUF",
      "Pruning and sparsity",
      "Knowledge distillation",
      "Exporting to ONNX; ONNX Runtime and TensorRT",
      "Batching strategies and latency percentiles"
    ],
    res: [
      ["TinyML and Efficient Deep Learning (MIT 6.5940)", "https://efficientml.ai/", "course"],
      ["A Visual Guide to Quantization (Maarten Grootendorst)", "https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization", "article"],
      ["Hugging Face Optimum", "https://huggingface.co/docs/optimum/index", "docs"]
    ],
    tip: "Har optimization ke saath do number do: speed kitni badhi, quality kitni giri. Bina quality check ke quantization aadha kaam hai."
  }
});
