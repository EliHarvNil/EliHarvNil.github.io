/****** Object:  Table [dbo].[BlogPosts]    Script Date: 8/27/2020 10:24:46 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[BlogPosts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreateDate] [datetime2](2) NOT NULL,
	[Header] [nvarchar](25) NOT NULL,
	[Body] [nvarchar](250) NULL,
	[HeaderImageRoute] [nchar](10) NULL,
	[Tags] [nvarchar](50) NULL,
 CONSTRAINT [PK_BlogPosts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[BlogPosts] ADD  CONSTRAINT [DF_BlogPosts_CreateDate]  DEFAULT (sysutcdatetime()) FOR [CreateDate]
GO
